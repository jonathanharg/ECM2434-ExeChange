from apps.api.authentication import gen_token, get_username
from apps.api.models import ExeChangeUser
from django.db.utils import IntegrityError
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response


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
            new_user = ExeChangeUser.objects.create_user(
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
