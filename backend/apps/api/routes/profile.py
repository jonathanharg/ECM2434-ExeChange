from datetime import datetime

from apps.api.authentication import authenticate_user
from apps.api.models import ClothingItem, ExeChangeUser
from django.http import HttpRequest
from django.http.response import Http404
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

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