from apps.api.models import ClothingItem, ItemTag
from django.core.exceptions import ValidationError
from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .authentication import authenticate_user


@api_view(["POST"])
def post(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)
    if authenticated_user is None:
        return Response(
            {
                "status": "NOT_LOGGED_IN",
                "message": "You need to be logged in to upload.",
            }
        )

    upload_caption = request.data["caption"]
    upload_tags = request.data.getlist("tags[]")
    data = {}
    try:
        item = ClothingItem.objects.create(
            caption=upload_caption, owner=authenticated_user
        )
        item.full_clean()
        item.save()

    except ValidationError as e:
        data = {
            "status": "INVALID_LENGTH",
            "message": "Submission Denied",
        }
        print(e)

    for tag in upload_tags:
        try:
            tag_object = ItemTag.objects.get(name=tag)
            item.tags.add(tag_object)
            data = {
                "status": "OK",
                "message": "Submission accepted",
            }

        except ItemTag.DoesNotExist as e:
            item.delete()
            data = {
                "status": "INVALID_TAG",
                "message": "This tag is invalid!",
            }
            print(e)
    return Response(data)


@api_view(["GET"])
def tags(request: HttpRequest) -> Response:
    return JsonResponse(list(ItemTag.objects.values()), safe=False)
