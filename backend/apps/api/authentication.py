from django.contrib.auth.models import User
from django.http import Http404, HttpRequest
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import (  # type: ignore
    AuthenticationFailed,
    InvalidToken,
    JWTAuthentication,
)
from rest_framework_simplejwt.tokens import RefreshToken  # type: ignore


def gen_token(user: User) -> RefreshToken:  # type: ignore
    """
    Generate JWT token
    Args:
        user: Passed user to generate token for.
    Returns:
        new_token: RefreshToken including access token for given user.
    """
    new_token = RefreshToken.for_user(user)
    return new_token


def get_username(email: str) -> str:
    """
    Generates a username for a given email address, simply by removing the email.

    Args:
        email (str): The given email address to generate a username for

    Returns:
        str: The username as a string.
    """
    username = email.split("@")[0]
    return username


def authenticate_user(request: HttpRequest) -> User | None:
    """
    Authenticate a request with a given access token that is sent in the cookies.

    Args:
        request (HttpRequest): Request sent from the frontend.

    Returns:
        User: User object that the token is valid for.
    """
    jwt_authenticator = JWTAuthentication()

    input_token = request.COOKIES.get("_auth")

    try:
        valid_token = jwt_authenticator.get_validated_token(input_token)
        token_user = jwt_authenticator.get_user(valid_token)
        user_object = get_object_or_404(User, username=token_user)
        return user_object

    except InvalidToken as _:
        # Token is not valid.
        print("That is not a valid token, user is not logged in!")
        return None

    except AuthenticationFailed as _:
        # Valud user object cannot be found in the given token.
        print("User has not been found in the token!")
        return None

    except Http404:
        # User object cannot be found from username
        # meaning, error in the database
        print("There have been no matches to the given query")
        return None
