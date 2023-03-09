import re

from apps.api.authentication import authenticate_user
from apps.api.models import ClothingItem, ItemTag
from django.http import HttpRequest
from PIL import Image, ImageOps, UnidentifiedImageError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)


@api_view(["POST"])
def post(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)
    if authenticated_user is None:
        return Response(
            NOT_LOGGED_IN,
            status=HTTP_401_UNAUTHORIZED,
        )

    # We can ignore the type here since Django doesn't include it
    form = request.data  # type: ignore

    if ("image" not in form) | ("caption" not in form) | ("tags[]" not in form):
        return Response(
            INVALID_SUBMISSION,
            status=HTTP_400_BAD_REQUEST,
        )

    if "description" not in form:
        form["description"] = ""

    description = form["description"].strip()

    caption = form["caption"]
    # Removes most non alpha numeric characters
    caption_alphanumeric = re.sub(r"[^a-zA-Z0-9\ \&/()\-\'\"]", "", caption.strip())
    # Replace multiple successive spaces with a single space
    caption_clean = re.sub(r"\s\s+", " ", caption_alphanumeric)
    caption_no_whitespace = re.sub(r"\s+", "", caption_alphanumeric)

    if (len(caption_clean) > 100) | (len(caption_no_whitespace) < 5):
        return Response(
            INVALID_CAPTION,
            status=HTTP_400_BAD_REQUEST,
        )

    if len(description) > 280:
        return Response(
            INVALID_DESCRIPTION,
            status=HTTP_400_BAD_REQUEST,
        )

    item_tags = form.getlist("tags[]")

    try:
        # Ignore the types, we have already returned a response if the incorrect types are not present
        item_tags = list(map(lambda x: ItemTag.objects.get(value=x), item_tags))  # type: ignore
    except ItemTag.DoesNotExist as _:
        return Response(
            INVALID_TAG,
            status=HTTP_400_BAD_REQUEST,
        )

    image = form["image"]

    try:
        img = Image.open(image)
    except UnidentifiedImageError as _:
        return Response(IMAGE_FORMAT_ERROR, status=HTTP_400_BAD_REQUEST)

    if (img.width < 375) | (img.height < 500):
        return Response(IMAGE_SIZE_ERROR, status=HTTP_400_BAD_REQUEST)

    img = ImageOps.exif_transpose(img)
    img = img.convert("RGB")
    img = ImageOps.fit(img, (675, 900), method=Image.LANCZOS, centering=(0.5, 0.5))
    image.seek(0)
    img.save(image, "JPEG", subsampling=0, quality=85, optimize=True)

    item = ClothingItem.objects.create(
        caption=caption_clean,
        owner=authenticated_user,
        image=image,
        description=description,
    )
    item.full_clean()
    item.save()

    for tag in item_tags:
        item.tags.add(tag)

    return Response(
        OK,
        status=HTTP_201_CREATED,
    )


NOT_LOGGED_IN = {
    "status": "NOT_LOGGED_IN",
    "message": "You need to be logged in to upload.",
}

INVALID_SUBMISSION = {
    "status": "INVALID_SUBMISSION",
    "message": "Please include a valid image, caption and at least one valid tag.",
}

INVALID_CAPTION = {
    "status": "INVALID_CAPTION",
    "message": "Post captions must not be more than 100 characters long or less than 5.",
}

INVALID_DESCRIPTION = {
    "status": "INVALID_DESCRIPTION",
    "message": "Post descriptions must not be more than 280 characters long",
}

INVALID_TAG = {"status": "INVALID_TAG", "message": "Not all tags provided were valid."}

OK = {
    "status": "OK",
    "message": "Submission accepted",
}

IMAGE_FORMAT_ERROR = {
    "status": "IMAGE_FORMAT_ERROR",
    "message": "The image format cannot be opened or identified!",
}

IMAGE_SIZE_ERROR = {
    "status": "IMAGE_SIZE_ERROR",
    "message": "The image should be at least 375 by 500 pixels.",
}
