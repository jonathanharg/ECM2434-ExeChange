from apps.api.authentication import gen_token, send_verification_email
from apps.api.models import ExeChangeUser
from django.http import Http404, HttpRequest
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["POST"])
def verify(request: HttpRequest) -> Response:
    username = request.data["username"]  # type: ignore
    verification_code = request.data["code"]  # type: ignore

    try:
        # get user object to verify
        user_to_verify = get_object_or_404(ExeChangeUser, username=username)

        # if user is already verified return ALREADY_VERIFIED
        if user_to_verify.is_verified:
            return Response(ALREADY_VERIFIED)

        # verification code from user object
        user_to_verify_code = user_to_verify.verification_code
        print("code: ", user_to_verify_code)

        if verification_code == user_to_verify_code:
            # verification is correct
            user_to_verify.is_verified = True
            user_to_verify.save()

            # generate access token for user so full access is available
            token = gen_token(user_to_verify)

            return Response(
                {
                    "status": "OK",
                    "message": "user verified",
                    "username": user_to_verify.username,
                    "token": str(token.access_token),
                    "refresh": str(token),
                }
            )

        # Verification code from email link was not correct.
        return Response(INCORRECT_CODE)

    except Http404:
        return Response(INCORRECT_USER)


@api_view(["POST"])
def resend_verify(request: HttpRequest) -> Response:
    """
    Link clicked from login page to resend verify email
    gets code for username passed in request and resends the email with the code.
    """
    username = request.data["username"]  # type: ignore

    try:
        user_object = get_object_or_404(ExeChangeUser, username=username)

        # Resend verification email
        send_verification_email(user_object)

        # sending was okay.
        return Response(
            {
                "status": "OK",
                "message": "resent email successfully",
            }
        )

    except Http404:
        return Response(INCORRECT_USER)


INCORRECT_CODE = {
    "status": "INCORRECT_CODE",
    "message": "Given verification code was not correct!",
}

INCORRECT_USER = {
    "status": "INCORRECT_USER",
    "message": "Given username is incorrect, no user found!",
}

ALREADY_VERIFIED = {
    "status": "ALREADY_VERIFIED",
    "message": "User is already verified",
}
