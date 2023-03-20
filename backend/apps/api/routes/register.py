from apps.api.authentication import (
    gen_token,
    gen_unique_code,
    get_username,
    send_verification_email,
)
from apps.api.models import ExeChangeUser
from django.conf import settings
from django.db.utils import IntegrityError
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED


@api_view(["POST"])
def register(request: HttpRequest) -> Response:
    """
    Function that registers a user to the database and sends the user a verification email.

    Args:
        request (HttpRequest): JSON data including username, password and confirm password

    Returns:
        Response: HTTP status code and message
    """
    # Ignoring types here, as mypy throws errors but these are valid attributes.
    email_address = request.data["user"]  # type: ignore
    user_password = request.data["password"]  # type: ignore
    user_confirm_password = request.data["confirmPwd"]  # type: ignore

    if user_password == user_confirm_password:
        # Generate new user and add to User database using django.auth User model
        new_user_username = get_username(email_address)

        # Generating verification code for user
        new_user_verification_code = gen_unique_code()

        try:
            new_user = ExeChangeUser.objects.create_user(
                username=new_user_username,
                email=email_address,
                password=user_password,
                verification_code=new_user_verification_code,
                is_verified=False,
            )

        except IntegrityError:
            return Response(UNIQUE_ERROR, status=HTTP_400_BAD_REQUEST)

        # on debug testing, do not need to send email.
        if settings.SEND_VERIFICATION_EMAIL:  # type: ignore
            new_user.is_verified = True
            new_user.save()
            token = gen_token(new_user)
            return Response(
                {
                    "status": "OK_NO_SEND",
                    "message": "user registration accepted",
                    "username": get_username(email_address),
                    "access": str(token.access_token),
                    "refresh": str(token),
                }
            )

        new_user.save()
        # sending verification email to user
        if send_verification_email(new_user):
            return Response(REGISTRATION_ACCEPTED_VERIFICATION_SENT)

        # error in sending email
        return Response(VERIFICATION_EMAIL_ERROR, status=HTTP_400_BAD_REQUEST)

    return Response(CREDENTIAL_ERROR, status=HTTP_401_UNAUTHORIZED)


REGISTRATION_ACCEPTED_VERIFICATION_SENT = {
    "status": "OK",
    "message": "User registration accepted, and email sent!",
}

VERIFICATION_EMAIL_ERROR = {
    "status": "VERIFICATION_EMAIL_ERROR",
    "message": "Verification email did not send properly :(",
}

CREDENTIAL_ERROR = {
    "status": "CREDENTIAL_ERROR",
    "message": "Password and confirm password do not match!",
}

UNIQUE_ERROR = {"status": "UNIQUE_ERROR", "message": "User already signed up!"}
