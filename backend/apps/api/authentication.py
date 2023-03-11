import random
import string

import yagmail
from apps.api.models import ExeChangeUser
from django.http import Http404, HttpRequest
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import (
    AuthenticationFailed,
    InvalidToken,
    JWTAuthentication,
)
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings


def gen_token(user: ExeChangeUser) -> RefreshToken:  # type: ignore
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


def gen_unique_code() -> str:
    chars = string.ascii_letters + string.digits

    res = ""

    n = random.randint(10, 15)
    for _ in range(n):
        res += random.choice(chars)

    return res


def send_verification_email(user: ExeChangeUser) -> None: # type: ignore
    """
    This function will take an unverified user object and send an email to the email associated with the user
    containing a link that will successfully verify the user onclick.
    """
    # Generate link to send

    username = user.username
    code = user.verification_code

    yag = yagmail.SMTP("noreplyexechange@gmail.com", oauth2_file="credentials.json")

    body = f" Hello {username}! Welcome to ExeChange, clearly you heard the rumours, Big things are coming and if you click the below link, you will be a part of it..."

    html_link = f"<a href='{settings.DOMAIN_NAME}/verify?username={username}&code={code}'>Verify me!</a>" # type: ignore
    # send email
    yag.send(user.email, "ExeChange Verfication", contents=[body, html_link])


def authenticate_user(request: HttpRequest) -> ExeChangeUser | None:  # type: ignore
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
        user_object = get_object_or_404(ExeChangeUser, username=token_user)
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
