from datetime import datetime, timedelta, timezone
from itertools import chain
from apps.api.authentication import authenticate_user
from apps.api.models import ClothingItem, ExeChangeUser, Location, Trade
from apps.api.responses import (
    CONFIRM_TRADE_REJECT,
    INVALID_LOCATION,
    INVALID_TIME,
    INVALID_TRADE_ACCEPT,
    INVALID_TRADE_ITEMS,
    INVALID_TRADE_REQUEST,
    INVALID_TRADE_SELF,
    NOT_LOGGED_IN,
    OK,
    TRADE_NOT_FOUND,
    ITEM_ALREADY_REQUESTED
)
from apps.api.serializer import TradeSerializer
from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.utils.dateparse import parse_datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED


def valid_trade_time(time: datetime | None) -> bool:
    now = datetime.now(timezone.utc)
    TRADING_HOURS = [9, 10, 11, 12, 13, 14, 15, 16]

    half_past = time.minute != 30
    in_hours = time.hour in TRADING_HOURS
    in_past = time <= now
    within_a_week = (time - now) < timedelta(days=7)
    weekend = time.weekday() > 4  # Index of weekdays starting a Monday: 0, 4 is Friday
    return (
        (time is None)
        | (not in_hours)
        | (not half_past)
        | (in_past)
        | (not within_a_week)
        | weekend
    )


def item_request_by_user(user: ExeChangeUser, item: ClothingItem) -> bool:
    asked_for = Trade.objects.filter(Q(giver_giving=item) & Q(receiver=user)).exists()
    exchanged_for = Trade.objects.filter(
        Q(receiver_exchanging=item) & Q(giver=user)
    ).exists()
    return asked_for | exchanged_for


@api_view(["POST"])
def request_trade(request: HttpRequest) -> Response:
    user = authenticate_user(request)

    if user is None:
        return NOT_LOGGED_IN

    data = request.data

    if ("giver_giving" not in data) | ("giver" not in data):
        return INVALID_TRADE_REQUEST

    giver = ExeChangeUser.objects.get(id=request.data["giver"])

    if user == giver:
        return INVALID_TRADE_SELF

    try:
        giver_giving = list(
            map(lambda x: ClothingItem.objects.get(id=x), request.data["giver_giving"])
        )
    except ClothingItem.DoesNotExist:
        return INVALID_TRADE_ITEMS

    for item in giver_giving:
        if giver != item.owner:
            return INVALID_TRADE_ITEMS

        if item_request_by_user(user, item):
            return ITEM_ALREADY_REQUESTED
        
    message = ""

    if "message" in request.data:
        message = request.data["message"].strip()

    trade_request = Trade.objects.create(
        receiver=user,
        giver=giver,
        message=message,
    )
    trade_request.giver_giving.set(giver_giving)
    trade_request.full_clean()
    trade_request.save()

    return Response(
        {"status": "OK", "message": "Submission accepted", "id": trade_request.pk},
        status=HTTP_201_CREATED,
    )


@api_view(["POST"])
def reject_trade(request: HttpRequest, trade_id: int) -> Response:
    user = authenticate_user(request)

    if user is None:
        return NOT_LOGGED_IN

    try:
        trade = Trade.objects.get(id=trade_id)
    except Trade.DoesNotExist:
        return TRADE_NOT_FOUND

    if (trade.giver != user) & (trade.receiver != user):
        return TRADE_NOT_FOUND

    if (trade.status == trade.TradeStatuses.COMPLETED) | (
        trade.status == trade.TradeStatuses.REJECTED
    ):
        return TRADE_NOT_FOUND

    # user must confirm the rejection with the key value "reject": True in request data
    if ("reject" not in request.data) | (request.data["reject"] != True):
        return CONFIRM_TRADE_REJECT

    trade.status = Trade.TradeStatuses.REJECTED
    trade.save()
    return OK


@api_view(["POST"])
def accept_trade(request: HttpRequest, trade_id: int) -> Response:
    user = authenticate_user(request)

    if user is None:
        return NOT_LOGGED_IN

    try:
        trade = Trade.objects.get(id=trade_id)
    except Trade.DoesNotExist:
        return TRADE_NOT_FOUND

    # Trade must be accepted by the person who is giving the items
    if trade.giver != user:
        return TRADE_NOT_FOUND

    if trade.status != Trade.TradeStatuses.PENDING:
        return TRADE_NOT_FOUND

    data = request.data

    if (
        ("receiver_exchanging" not in data)
        | ("location" not in data)
        | ("time" not in data)
    ):
        return INVALID_TRADE_ACCEPT

    try:
        receiver_exchanging = list(
            map(
                lambda x: ClothingItem.objects.get(id=x),
                request.data["receiver_exchanging"],
            )
        )
    except ClothingItem.DoesNotExist:
        return INVALID_TRADE_ITEMS

    for item in receiver_exchanging:
        if trade.receiver != item.owner:
            return INVALID_TRADE_ITEMS

        if item_request_by_user(user, item):
            return ITEM_ALREADY_REQUESTED

    try:
        location = Location.objects.get(name=data["location"])
    except Location.DoesNotExist:
        return INVALID_LOCATION

    try:
        time = parse_datetime(data["time"])
    except ValueError:
        return INVALID_TIME

    if not valid_trade_time(time):
        return INVALID_TIME

    time = time.replace(second=0, microsecond=0)  # ignore anything less than minutes

    trade.receiver_exchanging.set(receiver_exchanging)
    trade.location = location
    trade.status = trade.TradeStatuses.ACCEPTED
    trade.time = time
    trade.accepted_at = datetime.now()
    trade.save()

    return Response(
        {"status": "OK", "message": "Submission accepted", "id": trade.pk},
        status=HTTP_200_OK,
    )


@api_view(["GET"])
def get_trades(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return NOT_LOGGED_IN
    # TODO: Sort by something?
    trades = Trade.objects.filter(
        Q(receiver=authenticated_user) | Q(giver=authenticated_user)
    )
    accepted_trades = trades.filter(status=Trade.TradeStatuses.ACCEPTED).order_by("time")
    other_trades = trades.exclude(status=Trade.TradeStatuses.ACCEPTED).order_by("requested_at")
    trades_serializer = TradeSerializer(list(chain(accepted_trades, other_trades)), many=True)
    return JsonResponse(trades_serializer.data, safe=False)
