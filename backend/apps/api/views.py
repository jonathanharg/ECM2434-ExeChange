from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import HttpRequest
from django.db.utils import IntegrityError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


def gen_token(user: User) -> RefreshToken:
    """
    Generate JWT token
    Args:
        user: Passed user to generate token for.
    """
    new_token = RefreshToken.for_user(user)
    return new_token


@api_view(["GET"])
def status(request: HttpRequest) -> Response:
    data = {"status": "OK", "message": "Coming soon..."}
    return Response(data)


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
    email_address = request.data["user"]
    user_password = request.data["password"]

    # username is a required parameter.
    # potentially write a get_username function that splits email in a file that we can import from in login and register.
    user = authenticate(username=email_address, password=user_password)

    if user is not None:
        print("USER IN DATABASE")

        # Creating JWT Access token
        token = gen_token(user)
        print("Access token: " + str(token.access_token)),
        print("Refresh token:" + str(token))

        data = {
            "status": "OK",
            "message": "User authentication excepted",
            "access": str(token.access_token),
            "refresh": str(token),
        }
    else:
        print("User not in database")
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
    email_address = request.data["user"]
    user_password = request.data["password"]
    user_confirm_password = request.data["confirmPwd"]

    if user_password == user_confirm_password:
       
        try:
            # Generate new user and add to User database using django.auth User model
            new_user = User.objects.create_user(
            username=email_address, email=email_address, password=user_password)
            new_user.save()

            print("USER ADDED TO DATABASE!")

            # Generating new JWT token for registered user, this means that they do not need to log in after registering
            token = gen_token(new_user)

            data = {
                "status": "OK",
                "message": "User authentication excepted",
                "access": str(token.access_token),
                "refresh": str(token),
            }
        except IntegrityError:
            data = {
                "status": "UNIQUE_ERROR",
                "message": "User already signed up!"
            }
    else:
        data = {"status": "CREDENTIAL_ERROR", "message": "Password and confirm do not match"}

    return Response(data)
