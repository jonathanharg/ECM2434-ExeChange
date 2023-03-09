from apps.api.authentication import authenticate_user
from apps.api.models import ClothingItem, ExeChangeUser, Location, Trade
from apps.api.serializer import TradeSerializer
from django.core import serializers
from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.http.response import Http404
from django.shortcuts import get_object_or_404
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

    if (trade.giver != user) | (trade.receiver != user):
        return TRADE_NOT_FOUND

    if ("reject" not in request.data) | (request.data["reject"] != True):
        return CONFIRM_TRADE_REJECT

    if trade.status == Trade.TradeStatuses.ACCEPTED:
        return CANNOT_REJECT_ACCEPTED_TRADE

    trade.status == Trade.TradeStatuses.REJECTED
    # trade.delete() # TODO: Should we delete the trades
    return OK


@api_view(["GET"])
def accept_trade(request: HttpRequest, trade_id: int) -> Response:
    user = authenticate_user(request)

    if user is None:
        return NOT_LOGGED_IN

    try:
        trade = Trade.objects.get(id=trade_id)
    except Trade.DoesNotExist:
        return TRADE_NOT_FOUND

    if (trade.giver != user) | (trade.receiver != user):
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

    trade.receiver_exchanging.set(receiver_exchanging)
    # trade.time
    # trade.location

    trade.status = trade.TradeStatuses.ACCEPTED

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

CANNOT_REJECT_ACCEPTED_TRADE = Response(
    {
        "status": "CANNOT_REJECT_ACCEPTED_TRADE",
        "message": "Cannot reject a Trade which has already been accepted.",
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
