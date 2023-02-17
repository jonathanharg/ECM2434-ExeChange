from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
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
    email_address = request.data["user"]
    user_password = request.data["password"]

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
    email_address = request.data["user"]
    user_password = request.data["password"]
    user_confirm_password = request.data["confirmPwd"]

    if user_password == user_confirm_password:
        # TODO: Add try except

        #Generate new user and add to User database using django.auth User model 
        new_user = User.objects.create_user(username=email_address, email=email_address, password=user_password)
        new_user.save()

        print("USER ADDED TO DATABASE!")

        #Generating new JWT token for registered user, this means that they do not need to log in after registering
        token = gen_token(new_user)

        data = {
            "status": "OK",
            "message": "User authentication excepted",
            "access": str(token.access_token),
            "refresh": str(token),
        }
    else:
        data = {"status": "BAD", "message": "Password and confirm do not match"}

    

    return Response(data)

