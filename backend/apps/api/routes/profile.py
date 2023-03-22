from apps.api.authentication import authenticate_user
from django.http import HttpRequest
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
