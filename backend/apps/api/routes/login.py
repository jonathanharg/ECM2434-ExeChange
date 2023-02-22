from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication, InvalidToken  # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken

from apps.api.authenticate import get_username, gen_token  # type: ignore

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

    if user is not None:
        print("LOG IN SUCCESSFULL!")

        # Creating JWT Access token
        # Ignoring type as libraries have no included type stubs
        token = gen_token(user)  # type: ignore

        data = {
            "status": "OK",
            "message": "User authentication excepted",
            "username": username,
            "access": str(token.access_token),
            "refresh": str(token),
        }
    else:
        print("LOGIN UNSUCCESSFUL, USER NOT FOUND IN DATABASE!")
        data = {"status": "BAD", "message": "User not authenticated"}

    return Response(data)