from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication, InvalidToken  # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken  # type: ignore
# Above are type ignored, as they have no type stubs written for them.


@api_view(["GET"])
def status(request: HttpRequest) -> Response:
    data = {"status": "OK", "message": "Coming soon..."}
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

@api_view(["POST"])
def logged_in(request):
    print("HELLO")

    jwt_authenticator = JWTAuthentication()

    # auth_header = jwt_authenticator.get_header(request)

    # print(auth_header)

    # print(request.COOKIES.get('_auth'))

    cookie_token = request.COOKIES.get('_auth')
    cookie_token = cookie_token.replace("I", "y")

    try:
        valid_token = jwt_authenticator.get_validated_token(cookie_token)
        print("VALID TOKEN:", valid_token)
    except InvalidToken as e:
        print("There has been an error with your token!")
        print(e)

    #print("VALID TOKEN: ", valid_token)

    return Response("BOO")


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
