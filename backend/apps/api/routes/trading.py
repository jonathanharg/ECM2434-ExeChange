from datetime import datetime, timedelta, timezone

from apps.api.authentication import authenticate_user
from apps.api.models import ClothingItem, ExeChangeUser, Location, Trade
from apps.api.serializer import TradeSerializer
from django.core import serializers
from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.http.response import Http404
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
)


# TODO: VALIDATE USER IMPUT MAKE SURE THEY ARE FOLOWING THE URELS
@api_view(["POST"])
def request_trade(request: HttpRequest) -> Response:
    receiver = authenticate_user(request)

    if receiver is None:
        return NOT_LOGGED_IN

    data = request.data

    if ("giver_giving" not in data) | ("giver" not in data):
        return INVALID_TRADE_REQUEST

    giver = ExeChangeUser.objects.get(id=request.data["giver"])

    if receiver == giver:
        return INVALID_REQUEST_SELF

    try:
        giver_giving = list(
            map(lambda x: ClothingItem.objects.get(id=x), request.data["giver_giving"])
        )
    except ClothingItem.DoesNotExist:
        return INVALID_REQUEST_ITEMS

    if any(giver != item.owner for item in giver_giving):
        return INVALID_REQUEST_ITEMS

    message = ""

    if "message" in request.data:
        message = request.data["message"].strip()

    trade_request = Trade.objects.create(
        receiver=receiver,
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

    if ("reject" not in request.data) | (request.data["reject"] != True):
        return CONFIRM_TRADE_REJECT

    trade.status = Trade.TradeStatuses.REJECTED
    trade.save()
    # trade.delete() # TODO: Should we delete the trades
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
        return INVALID_REQUEST_ITEMS

    if any(trade.receiver != item.owner for item in receiver_exchanging):
        return INVALID_REQUEST_ITEMS

    try:
        location = Location.objects.get(name=data["location"])
    except Location.DoesNotExist:
        return INVALID_LOCATION

    try:
        time = parse_datetime(data["time"])
    except ValueError:
        return INVALID_TIME

    now = datetime.now(timezone.utc)
    TRADING_HOURS = [9, 10, 11, 12, 13, 14, 15, 16]

    if (
        (time is None)
        | (time.minute != 30)
        | (time.hour not in TRADING_HOURS)
        | (time <= now)
        | ((time - now) > timedelta(days=7))
        | time.weekday > 4 # Greater than Friday (4)
    ):
        return INVALID_TIME

    time = time.replace(second=0, microsecond=0)  # ignore seconds

    trade.receiver_exchanging.set(receiver_exchanging)
    trade.location = location
    trade.status = trade.TradeStatuses.ACCEPTED
    trade.time = time
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
    trades_serializer = TradeSerializer(trades, many=True)
    return JsonResponse(trades_serializer.data, safe=False)


NOT_LOGGED_IN = Response(
    {
        "status": "NOT_LOGGED_IN",
        "message": "You need to be logged in to trade.",
    },
    status=HTTP_401_UNAUTHORIZED,
)


INVALID_TRADE_REQUEST = Response(
    {
        "status": "INVALID_TRADE_REQUEST",
        "message": "Please include a valid giver and giver_giving.",  # TODO: Make this more user friendly
    },
    status=HTTP_400_BAD_REQUEST,
)

INVALID_TRADE_ACCEPT = Response(
    {
        "status": "INVALID_TRADE_ACCEPT",
        "message": "Please include a valid receiver exchanging, date, time and location.",  # TODO: Make this more user friendly
    },
    status=HTTP_400_BAD_REQUEST,
)

INVALID_REQUEST_SELF = Response(
    {
        "status": "INVALID_REQUEST_SELF",
        "message": "You can't trade with yourself silly!",
    },
    status=HTTP_400_BAD_REQUEST,
)

INVALID_REQUEST_ITEMS = Response(
    {
        "status": "INVALID_REQUEST_ITEMS",
        "message": "This person does not have all these items!",
    },
    status=HTTP_400_BAD_REQUEST,
)

CONFIRM_TRADE_REJECT = Response(
    {
        "status": "CONFIRM_TRADE_REJECT",
        "message": 'Confirm you want to reject the trade with "reject": True',
    },
    status=HTTP_400_BAD_REQUEST,
)

OK = Response(
    {"status": "OK"},
    status=HTTP_200_OK,
)

TRADE_NOT_FOUND = Response(
    {"status": "TRADE_NOT_FOUND", "message": "Could not find the trade."},
    status=HTTP_404_NOT_FOUND,
)

INVALID_LOCATION = Response(
    {"status": "INVALID_LOCATION", "message": "Could not find the location."},
    status=HTTP_400_BAD_REQUEST,
)

INVALID_TIME = Response(
    {"status": "INVALID_TIME", "message": "The time is not valid."},
    status=HTTP_400_BAD_REQUEST,
)
