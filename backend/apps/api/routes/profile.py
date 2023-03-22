from datetime import datetime

from apps.api.authentication import authenticate_user
from apps.api.models import ClothingItem, ExeChangeUser, PendingTrade, Achievement, Location
from django.http import HttpRequest, JsonResponse
from django.http.response import Http404
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)

from apps.api.serializer import UserProfileDataSerializer


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
def get_profile_data(request: HttpRequest, username: str) -> JsonResponse:
    authenticated_user = authenticate_user(request)
    
    if authenticated_user is None:
        return Response(
            {"status": "BAD_REQUEST", "message": "User credentials not correct!"}
        )
    
    user_object = get_object_or_404(ExeChangeUser, username= str(username))
    
    serializer = UserProfileDataSerializer(user_object)
    return JsonResponse(serializer.data, safe=False)

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
    

@api_view(["POST"])
def deleteImg(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)
    if authenticated_user is None:
        return Response(
            NOT_LOGGED_IN,
            status=HTTP_401_UNAUTHORIZED,
        )

    if "id" not in request.data :
        return Response(
            INVALID_SUBMISSION,
            status=HTTP_400_BAD_REQUEST,
        )
    idObj = request.data["id"]

    try:    
        item = ClothingItem.objects.get(id=idObj)
    except Http404:
        return Response(ITEM_NOT_FOUND)
    
    if authenticated_user != item.owner:
        return Response(
            INVALID_OWNER,
            status=HTTP_401_UNAUTHORIZED
        )
    try:
        item.delete()
    except ValueError:
        return Response(DELETE_ERROR)

    return Response(
        OK,
        status=HTTP_200_OK,
    )
    
ITEM_NOT_FOUND = {
    "status": "ITEM_NOT_FOUND",
    "message": "couldn't match given ID to existing object ID's",
}

DELETE_ERROR = {
    "status": "DELETE_ERROR",
    "message": "error occured when trying to delete item from database",
}

NOT_LOGGED_IN = {
    "status": "NOT_LOGGED_IN",
    "message": "You need to be logged",
}

INVALID_OWNER = {
    "status": "INVALID_OWNER",
    "message": "You are not the owner of the selected item",
}

INVALID_SUBMISSION = {
    "status": "INVALID_SUBMISSION",
    "message": "Error",
}

OK = {
    "status": "OK",
    "message": "Image removed",
}

@api_view(["POST"])
def get_achievements(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            {
                "status": "BAD_REQEUST",
                "message": "User credentials are not correct!",
            }
    )

    achievement_object = get_object_or_404(Achievement)

    if authenticated_user is None:
        return Response(
            {"status": "BAD_REQUEST", "message": "User credentials not correct!"}
        )

    return Response(
        {
            "id": achievement_object.id,
            "text": achievement_object.text,
            "colour": achievement_object.colour,
        }
    ) 

@api_view(["POST"])
def get_locations(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            {
                "status": "BAD_REQEUST",
                "message": "User credentials are not correct!",
            }
    )

    Location_object = get_object_or_404(Location)

    if authenticated_user is None:
        return Response(
            {"status": "BAD_REQUEST", "message": "User credentials not correct!"}
        )

    return Response(
        {
            "name": Location_object.name,
            "trades": Location_object.trades,
        }
    ) 