from apps.api.models import ClothingItem, ItemTag
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db.models import Model
from django.db.utils import IntegrityError
from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication  # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken  # type: ignore

from .authentication import authenticate_user


@api_view(["POST"])
def post(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user == None:
        return Response(
            {
                "status": "NOT_LOGGED_IN",
                "message": "You need to be logged in to upload.",
            }
        )

    caption = request.data["caption"]
    tags = request.data.getlist("tags[]")  # gets tags from user input
    try:
        item = ClothingItem.objects.create(caption=caption, owner=authenticated_user)
        item.save()
        item.full_clean()

        for tag in tags:
            try:
                tag_object = ItemTag.objects.get(tag=tag)
            except Exception as e:
                print(e)
                print(
                    "Create a TAG object, this is DEBUG ONLY and should NOT be done in PROD"
                )
                # NOTE: You should only be able to add existing tags, this is for DEBUG ONLY!
                tag_object = ItemTag.objects.create(tag=tag)
                tag_object.save()
                tag_object.full_clean()
            item.tags.add(tag_object)

        data = {
            "status": "OK",
            "message": "Submission accepted",
        }
    except ValidationError as e:
        # TODO:  Format error message
        data = {
            "status": "INVALID_LENGTH",
            "message": "Submission Denied, {e}",
        }
        print(e)
    return Response(data)
