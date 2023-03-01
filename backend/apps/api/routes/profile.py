from apps.api.authentication import authenticate_user
from apps.api.models import ExeChangeUser, PendingTrade
from django.http import HttpRequest
from django.http.response import Http404
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.api.models import ClothingItem, PendingTrade


@api_view(["GET"])
def trade_requests(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            {
                "status": "BAD_REQUEST",
                "message": "User not authenticated",
            }
        )

    pending_trades = PendingTrade.objects.filter(acceptor=authenticated_user).values()

    data = []

    for pending_trade in pending_trades:
        print(pending_trade)
        initiator_username = get_object_or_404(
            ExeChangeUser, id=pending_trade["initiator_id"]
        ).username
        pending_trade_date = pending_trade["date"].strftime("%d/%m/%Y")

        data.append(
            {
                "id": pending_trade["id"],
                "initiator": initiator_username,
                "location": pending_trade["location"],
                "time": pending_trade["time"],
                "date": pending_trade_date,
                "itemId": pending_trade["item_id"],
            }
        )

    return Response(data)


@api_view(["GET"])
def get_profile_data(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            {"status": "BAD_REQUEST", "message": "User credentials not correct!"}
        )

    return Response(
        {
            "name": authenticated_user.username,
            "level": authenticated_user.profile_level,
            "levelPercent": authenticated_user.current_xp,
        }
    )

@api_view(["POST"])
def confirm_pending_trade(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response({
            "status": "BAD_REQEUST",
            "message": "User credentials are not correct!",
        })
    
    try:
        clothing_item_id = request.data["itemId"]

        clothing_item_object = get_object_or_404(ClothingItem, id=int(clothing_item_id))

        clothing_item_object.in_pending_trade = True

        clothing_item_object.save()

        return Response({
            "status": "OK",
            "message": "success",
            "pending_status": str(clothing_item_object.in_pending_trade).replace("T", "t")
        })

    except Http404:
        pass

@api_view(["POST"])
def get_pending_trade_status(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response({
            "status": "BAD_REQEUST",
            "message": "User credentials are not correct!",
        })

    try:
        clothing_item_id = request.data["itemId"]

        clothing_item_object = get_object_or_404(ClothingItem, id=int(clothing_item_id))

        print("Hello")

        return Response(
            {
            "status": "OK",
            "message": "success",
            "pendingTradeStatus": str(clothing_item_object.in_pending_trade)
            }
        )

    except Http404:
        pass
    