from apps.api.authentication import get_username, gen_unique_code, send_verification_email
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

            # Sending a user verification email
            send_verification_email(new_user)

            return Response(REGISTRATION_ACCEPTED)
        
        except IntegrityError:
            return Response(UNIQUE_ERROR)
        
    else:
        return Response(CREDENTIAL_ERROR)


REGISTRATION_ACCEPTED = {
    "status": "OK",
    "message": "User registration accepted!",
}

CREDENTIAL_ERROR = {
    "status": "CREDENTIAL_ERROR",
    "message": "Password and confirm password do not match!",
}

UNIQUE_ERROR = {
    "status": "UNIQUE_ERROR",
    "message": "User already signed up!"
}