from apps.api.authentication import gen_token, get_username
from django.contrib.auth import authenticate
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED


@api_view(["POST"])
def login(request: HttpRequest) -> Response:
    """
    Function that logs a user in, by checking wether they authenticate correctly

    Args:
        request (HttpRequest): Including username and password

    Returns:
        Response (Response): HTTP status code and message
    """
    # Ignoring types here, as mypy throws errors but these are valid attributes.
    email_address = request.data["user"]  # type: ignore
    user_password = request.data["password"]  # type: ignore

    username = get_username(email_address)

    user = authenticate(
        username=username,
        password=user_password,
    )

    if user is not None:
        # if the user is not verified, return an error.
        if not user.is_verified and not user.is_superuser:  # type: ignore
            return Response(NOT_VERIFIED, status=HTTP_400_BAD_REQUEST)

        # User is verified
        # Creating JWT Access token
        token = gen_token(user)

        return Response(
            {
                "status": "OK",
                "message": "User authentication excepted",
                "username": username,
                "access": str(token.access_token),
                "refresh": str(token),
            }
        )

    return Response(NOT_AUTHENTICATED, status=HTTP_401_UNAUTHORIZED)


NOT_AUTHENTICATED = {
    "status": "NOT_AUTHENTICATED",
    "message": "User credentials are not correct.",
}


NOT_VERIFIED = {"status": "NOT_VERIFIED", "message": "User has not yet verifed."}
