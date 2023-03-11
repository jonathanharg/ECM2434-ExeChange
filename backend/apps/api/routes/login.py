from apps.api.authentication import gen_token, get_username
from django.contrib.auth import authenticate
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["POST"])
def login(request: HttpRequest) -> Response:
    """
    Login view that takes data from the frontend and inputs it into the django supplied User database using
    the User model, again supplied by Django.

    Links to Docs: https://docs.djangoproject.com/en/4.1/topics/auth/default/#django.contrib.auth

    Args:
        request (HttpRequest): Contains the JSON data sent from the frontend.

    Returns:
        Response: Include the JSON data that needs to be sent back to the frontend, i.e. STATUS good or STATUS bad.
    """
    # Ignoring types here, as mypy throws errors but these are valid attributes.
    email_address = request.data["user"]  # type: ignore
    user_password = request.data["password"]  # type: ignore

    username = get_username(email_address)

    user = authenticate(
        username=username,
        password=user_password,
    )

    if not user.is_verified:  # type: ignore
        return Response(NOT_VERIFIED)

    if user is not None:
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
    else:
        return Response(NOT_AUTHENTICATED)


NOT_AUTHENTICATED = {
    "status": "NOT_AUTHENTICATED",
    "message": "User credentials are not correct.",
}


NOT_VERIFIED = {"status": "NOT_VERIFIED", "message": "User has not yet verifed."}
