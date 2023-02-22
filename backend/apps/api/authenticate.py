from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication, InvalidToken  # type: ignore
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
