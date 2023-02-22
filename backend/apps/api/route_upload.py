from apps.api.models import ClothingItem, ClothingOwner
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication  # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken  # type: ignore


@api_view(["POST"])
def post(request: HttpRequest) -> Response:
    caption = request.data["caption"]
    try:
        item = ClothingItem.objects.create(caption=caption)
        item.save()
        data = {
            "status": "OK",
            "message": "Submission accepted",
            "caption": {caption},
        }
    except TypeError as e:
        data = {
            "status": "BAD",
            "message": "Submission Denied",
            "caption": {caption},
        }
        print(e)
    return Response(data)
