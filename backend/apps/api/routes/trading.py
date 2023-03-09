from apps.api.authentication import authenticate_user
from apps.api.models import (
    ClothingItem,
    ExeChangeUser,
    Location,
    TradeRequest,
)
from apps.api.serializer import TradeRequestSerializer
from django.core import serializers
from django.http import HttpRequest, JsonResponse
from django.http.response import Http404
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)


# TODO: VALIDATE USER IMPUT MAKE SURE THEY ARE FOLOWING THE URELS
@api_view(["POST"])
def request_trade(request: HttpRequest) -> Response:
    receiver = authenticate_user(request)

    if receiver is None:
        return NOT_LOGGED_IN

    data = request.data

    if ("items" not in data) | ("giver" not in data):
        return INVALID_TRADE_REQUEST

    items = list(map(lambda x: ClothingItem.objects.get(id=x), request.data["items"]))
    giver = get_object_or_404(ExeChangeUser, id=request.data["giver"])

    if receiver == giver:
        return INVALID_REQUEST_SELF

    if any(giver != item.owner for item in items):
        return INVALID_REQUEST_ITEMS

    message = ""

    if "message" in request.data:
        message = request.data["message"].strip()

    trade_request = TradeRequest.objects.create(
        receiver=receiver,
        giver=giver,
        message=message,
    )
    trade_request.items.set(items)
    trade_request.full_clean()
    trade_request.save()

    return OK


@api_view(["GET"])
def get_requests(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            NOT_LOGGED_IN,
            status=HTTP_401_UNAUTHORIZED,
        )
    # TODO: INCLUDE TRADE MODEL NOT JUST REQUEST MODELS
    receiver = TradeRequest.objects.filter(from_user=authenticated_user)
    receiver_serializer = TradeRequestSerializer(receiver, many=True)
    giver = TradeRequest.objects.filter(to_user=authenticated_user)
    giver_serializer = TradeRequestSerializer(giver, many=True)
    data = {"outgoing": receiver_serializer.data, "incoming": giver_serializer.data}
    return JsonResponse(data, safe=False)


NOT_LOGGED_IN = Response(
    {
        "status": "NOT_LOGGED_IN",
        "message": "You need to be logged in to trade.",
    },
    status=HTTP_401_UNAUTHORIZED,
)

OK = Response(
    {
        "status": "OK",
        "message": "Submission accepted",
    },
    status=HTTP_201_CREATED,
)


INVALID_TRADE_REQUEST = Response(
    {
        "status": "INVALID_TRADE_REQUEST",
        "message": "Please include a valid giver and items.",
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
