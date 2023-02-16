from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["GET"])
def status(request):
    data = {"status": "OK", "message": "Coming soon..."}
    return Response(data)

@api_view(["POST"])
def login(request: HttpRequest) -> Response:
    email_address = request.data["user"]
    user_password = request.data["password"]

    user = authenticate(username=email_address, password=user_password)

    if user is not None:
        print("USER IN DATABASE")

        #Creating JWT Access token
        token = RefreshToken.for_user(user)
        print("Access token: " + str(token.access_token)),
        print("Refresh token:" + str(token))

        data = {
            "status": "OK", 
            "message": "User authentication excepted",
            "access": str(token.access_token),
            "refresh": str(token)
        }
    else:
        print("User not in database")
        data = {"status": "BAD", "message": "User not authenticated"}

    return Response(data)

@api_view(["POST"])
def register(request: HttpRequest) -> Response:
    email_address = request.data["user"]
    user_password = request.data["password"]
    #TODO: Add try except
    new_user = User.objects.create_user(username=email_address, email=email_address, password=user_password)
    new_user.save()
    data = {"status": "OK", "message": "User registered successfully"}
    return Response(data)