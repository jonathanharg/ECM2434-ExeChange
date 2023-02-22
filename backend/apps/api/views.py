from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication  # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken  # type: ignore

# Above are type ignored, as they have no type stubs written for them.


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


@api_view(["GET"])
def status(request: HttpRequest) -> Response:
    data = {"status": "OK", "message": "Coming soon..."}
    return Response(data)


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


@api_view(["POST"])
def register(request: HttpRequest) -> Response:
    """
    Registering a user:
    Taking data sent from the frontend and using the supplied Django user model and save the new_user to the User database.

    Required docs: https://docs.djangoproject.com/en/4.1/topics/auth/default/#django.contrib.auth

    Args:
        request (HttpRequest): JSON data from the frontend

    Returns:
        Response: Include the JSON data that needs to be sent back to the frontend
    """
    # Ignoring types here, as mypy throws errors but these are valid attributes.
    email_address = request.data["user"]  # type: ignore
    user_password = request.data["password"]  # type: ignore
    user_confirm_password = request.data["confirmPwd"]  # type: ignore

    if user_password == user_confirm_password:
        try:
            # Generate new user and add to User database using django.auth User model
            new_user_username = get_username(email_address)
            new_user = User.objects.create_user(
                username=new_user_username, email=email_address, password=user_password
            )
            new_user.save()

            print("REGISTRATION SUCCESSFULL AND USER ADDED TO DATABASE!")

            # Generating new JWT token for registered user, this means that they do not need to log in after registering
            token = gen_token(new_user)

            data = {
                "status": "OK",
                "message": "User authentication accepted",
                "username": new_user_username,
                "access": str(token.access_token),
                "refresh": str(token),
            }
        except IntegrityError:
            print(
                "NON UNIQUE EMAIL OR USERNAME USED THEREFORE, REGISTRATION UNSUCCESSFUL!"
            )
            data = {"status": "UNIQUE_ERROR", "message": "User already signed up!"}
    else:
        data = {
            "status": "CREDENTIAL_ERROR",
            "message": "Password and confirm do not match",
        }

    return Response(data)


@api_view(["POST"])
def refresh(request: HttpRequest) -> Response:
    """
    This function returns a new access token for a given refresh token.

    Args:
        request (HttpRequest): Includes the passed refresh token.

    Returns:
        Response: Includes the new access token
    """
    jwt_authenticator = JWTAuthentication()

    response = jwt_authenticator.authenticate(request)

    if response is not None:
        # Unpacking response, token is not needed hence _.
        user, _ = response
        # generate new access token and send back to the user !
        new_token = gen_token(user)
        return Response(
            {
                "status": "OK",
                "access": str(new_token.access_token),
                "refresh": str(new_token),
            }
        )

    return Response(
        {
            "status": "TOKEN_AUTHENTICATION_FAILED",
            "message": "Refresh token for given user was not accepted!",
        }
    )


@api_view(["GET"])
def products(request: HttpRequest) -> Response:
    # time.sleep(5)
    data = [
        {
            "id": 1,
            "name": "Cowboy Hat",
            "href": "#",
            "imageSrc": "https://i.ebayimg.com/images/g/csYAAOSwl9xePWGM/s-l500.jpg",
            "tags": ["Cowboy", "Hat"],
        }
    ] * 13
    return Response(data)
