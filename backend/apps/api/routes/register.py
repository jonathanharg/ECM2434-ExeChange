from apps.api.authentication import gen_token, get_username, gen_unique_code, send_verification_email
from apps.api.models import ExeChangeUser
from django.db.utils import IntegrityError
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import Http404


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

            # Generating verification code for user
            new_user_verification_code = gen_unique_code()

            new_user = ExeChangeUser.objects.create_user(
                username=new_user_username,
                email=email_address,
                password=user_password,
                verification_code=new_user_verification_code,
                is_verified = False,
            )
            new_user.save()

            print("REGISTRATION SUCCESSFULL AND USER ADDED TO DATABASE!")

            # Sending a user verification email
            send_verification_email(new_user)

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
def verify(request: HttpRequest) -> Response:
    username = request.data["username"]
    verification_code = request.data["code"]

    try:
        # get user object to verify
        user_to_verify = get_object_or_404(ExeChangeUser, username=username)

        # verification code from user object
        user_to_verify_code = user_to_verify.verification_code

        if verification_code == user_to_verify_code:
            # verification is correct
            user_to_verify.is_verified = True
            user_to_verify.save()

            return Response({
                "status": "OK",
                "message": "user verified"
            })
        else:
            print("verification is INCORRECT")
            return Response({
                "status": "BAD_REQUEST",
                "message": "code sent is not correct"
            })

    except Http404:
        return Response({
            "status": "BAD_REQUEST",
            "message": "Sent username is wrong"
        })
