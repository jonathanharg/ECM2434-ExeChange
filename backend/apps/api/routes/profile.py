from django.shortcuts import get_object_or_404
from apps.api.authentication import authenticate_user
from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)

from apps.api.models import ClothingItem, Achievement
from apps.api.models import ExeChangeUser
from apps.api.serializer import UserProfileDataSerializer

@api_view(["GET"])
def get_my_profile_data(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            {"status": "BAD_REQUEST", "message": "User credentials not correct!"}
        )
    
    serializer = UserProfileDataSerializer(authenticated_user)
    return JsonResponse(serializer.data, safe=False)

@api_view(["GET"])
def get_profile_data(request: HttpRequest, username: str) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            {"status": "BAD_REQUEST", "message": "User credentials not correct!"}
        )
    user_object = get_object_or_404(ExeChangeUser, username= str(username))

    serializer = UserProfileDataSerializer(user_object)
    return JsonResponse(serializer.data, safe=False)


@api_view(["POST"])
def deleteImg(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)
    if authenticated_user is None:
        return Response(
            NOT_LOGGED_IN,
            status=HTTP_401_UNAUTHORIZED,
        )

    if "id" not in request.data:
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
        return Response(INVALID_OWNER, status=HTTP_401_UNAUTHORIZED)
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