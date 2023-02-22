from django.contrib.auth import authenticate
from django.contrib.auth.models import User 
from django.db.utils import IntegrityError
from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication, InvalidToken, AuthenticationFailed  # type: ignore
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

def authenticate_user(request: HttpRequest) -> User:
    jwt_authenticator = JWTAuthentication()

    input_token = request.COOKIES.get('_auth')

    try:
        valid_token = jwt_authenticator.get_validated_token(input_token)
        token_user = jwt_authenticator.get_user(valid_token)

        print(token_user)

        #TODO: get User object from returned user_id in the token!
        user_object = get_user(token_user)

        
    
    except InvalidToken as _:
        print("That is not a valid token, user is not logged in!")

    except AuthenticationFailed as _:
        print("User has not been found in the token!")


