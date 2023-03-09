from apps.api.authentication import authenticate_user
from django.core import serializers
from apps.api.models import (
    ClothingItem,
    ExeChangeUser,
    Location,
    PendingTrade,
    TradeRequest,
)
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

from apps.api.serializer import TradeRequestSerializer


@api_view(["POST"])
def request_trade(request: HttpRequest) -> Response:
    receiver = authenticate_user(request)

    if receiver is None:
        return Response(
            NOT_LOGGED_IN,
            status=HTTP_401_UNAUTHORIZED,
        )
    
    message = request.data["message"].strip()

    if "message" not in get_requests.data:
        message = ""

    items = list(
        map(lambda x: ClothingItem.objects.get(id=x), request.data["items"])
    )
    giver = get_object_or_404(ExeChangeUser, id=request.data["giver"])

    trade_request = TradeRequest.objects.create(
        receiver=receiver,
        giver=giver,
        message=message,
    )
    trade_request.receiving.set(items)
    trade_request.full_clean()
    trade_request.save()

    return Response(OK, status=HTTP_201_CREATED)


@api_view(["GET"])
def get_requests(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            NOT_LOGGED_IN,
            status=HTTP_401_UNAUTHORIZED,
        )

    from_user = TradeRequest.objects.filter(from_user=authenticated_user);
    from_user_serializer = TradeRequestSerializer(from_user, many=True)
    to_user = TradeRequest.objects.filter(to_user=authenticated_user);
    to_user_serializer = TradeRequestSerializer(to_user, many=True)
    data = {
        "sent" : from_user_serializer.data,
        "received": to_user_serializer.data
    }
    return JsonResponse(data, safe=False)


@api_view(["POST"])
def trade(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response({"status": "BAD_REQUEST", "message": "user not authenticated"})

    acceptor = request.data["productOwnerId"]  # type: ignore
    time = request.data["selectedTime"]["time"]  # type: ignore
    date = request.data["selectedDates"]  # type: ignore
    item_id = request.data["itemId"]  # type: ignore
    location = request.data["selectedLocation"]["locationName"]  # type: ignore

    # time verification is still todo
    # date = date.split("T")[0]
    # date = date + " " + time + "Z"

    # date_object = datetime.strptime(date, "%Y-%m-%d %H:%M%Z")

    # if date_object <= datetime.now():
    #     return Response({
    #         "status": "BAD_REQUEST",
    #         "message": "Cannot trade in the past!"
    #     })

    try:
        acceptor_object = get_object_or_404(ExeChangeUser, id=acceptor)

        # A user cannot request their own item.
        if acceptor_object == authenticated_user:
            return Response(
                {
                    "status": "BAD_REQUEST",
                    "message": "A user cannot request their own item!",
                }
            )

        item_object = get_object_or_404(ClothingItem, id=item_id)

        new_trade = PendingTrade.objects.create(
            initiator=authenticated_user,
            acceptor=acceptor_object,
            time=time,
            date=date,
            item=item_object,
            location=location,
        )

        new_trade.full_clean()
        new_trade.save()
        return Response(
            {
                "status": "OK",
                "message": "trade saved successfully",
            }
        )

    except Http404:
        return Response(
            {
                "status": "BAD_REQUEST",
                "message": "item or acceptor object not found!",
            }
        )


NOT_LOGGED_IN = {
    "status": "NOT_LOGGED_IN",
    "message": "You need to be logged in to trade.",
}

OK = {
    "status": "OK",
    "message": "Submission accepted",
}