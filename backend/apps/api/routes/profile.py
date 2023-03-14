from datetime import datetime

from apps.api.authentication import authenticate_user
from apps.api.models import ClothingItem, ExeChangeUser, PendingTrade
from django.http import HttpRequest
from django.http.response import Http404
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response


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
def get_profile_data(request: HttpRequest, username: str) -> Response:
    authenticated_user = authenticate_user(request)
    
    user_object = get_object_or_404(ExeChangeUser, username= str(username))


    if authenticated_user is None:
        return Response(
            {"status": "BAD_REQUEST", "message": "User credentials not correct!"}
        )

    return Response(
        {
            "name": user_object.username,
            "level": user_object.profile_level,
            "levelPercent": user_object.current_xp,
        }
    ) 

@api_view(["GET"])
def whose_profile(request: HttpRequest, username: str) -> Response:
    authenticated_user = authenticate_user(request)
    user_object = get_object_or_404(ExeChangeUser, username= str(username))
    
    if authenticated_user.username == user_object.username:
        myProfile = True
    else:
        myProfile = False

    if authenticated_user is None:
        return Response(
            {"status": "BAD_REQUEST", "message": "User credentials not correct!"}
        )

    return Response(myProfile) 

@api_view(["POST"])
def confirm_pending_trade(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            {
                "status": "BAD_REQEUST",
                "message": "User credentials are not correct!",
            }
        )

    try:
        clothing_item_id = request.data["itemId"]  # type: ignore

        clothing_item_object = get_object_or_404(ClothingItem, id=int(clothing_item_id))

        clothing_item_object.in_pending_trade = True

        clothing_item_object.save()

        return Response(
            {
                "status": "OK",
                "message": "success",
                "pending_status": str(clothing_item_object.in_pending_trade).replace(
                    "T", "t"
                ),
            }
        )

    except Http404:
        return Response(
            {
                "status": "BAD",
                "message": "Http404 error",
            }
        )


@api_view(["POST"])
def get_pending_trade_status(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            {
                "status": "BAD_REQEUST",
                "message": "User credentials are not correct!",
            }
        )

    try:
        clothing_item_id = request.data["itemId"]  # type: ignore

        clothing_item_object = get_object_or_404(ClothingItem, id=int(clothing_item_id))

        return Response(
            {
                "status": "OK",
                "message": "success",
                "pending_status": str(clothing_item_object.in_pending_trade).lower(),
            }
        )

    except Http404:
        return Response(
            {
                "status": "BAD",
                "message": "Http404 error",
            }
        )


@api_view(["POST"])
def remove_pending_trade(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            {
                "status": "BAD_REQEUST",
                "message": "User credentials are not correct!",
            }
        )

    try:
        clothing_item_id = request.data["itemId"]  # type: ignore
        date = request.data["date"]  # type: ignore
        location = request.data["location"]  # type: ignore
        # time = request.data["time"] # type: ignore
        initiator = request.data["initiator"]  # type: ignore

        date_object = datetime.strptime(date, "%d/%m/%Y")
        # time_object = datetime.strptime(time, "%H:%M")

        initiator_object = get_object_or_404(ExeChangeUser, username=str(initiator))
        clothing_item_object = get_object_or_404(ClothingItem, id=int(clothing_item_id))
        # Get time working
        pending_trade_object = get_object_or_404(
            PendingTrade,
            initiator=initiator_object,
            acceptor=authenticated_user,
            date=date_object,
            location=str(location),
            item=clothing_item_object,
        )

        clothing_item_object.in_pending_trade = False
        clothing_item_object.save()
        pending_trade_object.delete()

        return Response(
            {
                "status": "OK",
                "message": "pending trade deleted",
            }
        )
    except Http404:
        return Response({"status": "BAD"})
