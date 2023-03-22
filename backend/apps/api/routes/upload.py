import re

from apps.api.authentication import authenticate_user
from apps.api.models import ClothingItem, ItemTag
from apps.api.responses import (
    INVALID_TAG,
    INVALID_UPLOAD_CAPTION,
    INVALID_UPLOAD_DESCRIPTION,
    INVALID_UPLOAD_IMAGE_FORMAT,
    INVALID_UPLOAD_IMAGE_SIZE,
    INVALID_UPLOAD_REQUEST,
    NOT_LOGGED_IN,
    UPLOAD_ACCEPTED,
)
from django.db.models import Q
from django.http import HttpRequest
from PIL import Image, ImageOps, UnidentifiedImageError
from rest_framework.decorators import api_view
from rest_framework.response import Response


# TODO: Don't upload duplicated items
@api_view(["POST"])
def upload(request: HttpRequest) -> Response:
    user = authenticate_user(request)
    if user is None:
        return NOT_LOGGED_IN

    # We can ignore the type here since Django doesn't include it
    form = request.data  # type: ignore

    if ("image" not in form) | ("caption" not in form) | ("tags[]" not in form):
        return INVALID_UPLOAD_REQUEST

    if "description" not in form:
        form["description"] = ""

    description = form["description"].strip()

    caption = form["caption"]
    # Removes most non alpha numeric characters
    caption_alphanumeric = re.sub(r"[^a-zA-Z0-9\ \&/()\-\'\"]", "", caption.strip())
    # Replace multiple successive spaces with a single space
    caption_clean = re.sub(r"\s\s+", " ", caption_alphanumeric)
    caption_no_whitespace = re.sub(r"\s+", "", caption_alphanumeric)

    if ClothingItem.objects.filter(Q(caption=caption) & Q(owner=user)).exists():
        # If a user uploads with a duplicate caption, ignore it.
        # Probably a resent request
        return Response()

    if (len(caption_clean) > 100) | (len(caption_no_whitespace) < 5):
        return INVALID_UPLOAD_CAPTION

    if len(description) > 280:
        return INVALID_UPLOAD_DESCRIPTION

    item_tags = form.getlist("tags[]")

    try:
        # Ignore the types, we have already returned a response if the incorrect types are not present
        item_tags = list(map(lambda x: ItemTag.objects.get(id=x), item_tags))  # type: ignore
    except ItemTag.DoesNotExist as _:
        return INVALID_TAG

    image = form["image"]

    try:
        img = Image.open(image)
    except UnidentifiedImageError as _:
        return INVALID_UPLOAD_IMAGE_FORMAT

    if (img.width < 375) | (img.height < 500):
        return INVALID_UPLOAD_IMAGE_SIZE

    img = ImageOps.exif_transpose(img)
    img = img.convert("RGB")
    img = ImageOps.fit(img, (675, 900), method=Image.LANCZOS, centering=(0.5, 0.5))
    image.seek(0)
    img.save(image, "JPEG", subsampling=0, quality=85, optimize=True)

    item = ClothingItem.objects.create(
        caption=caption_clean,
        owner=user,
        image=image,
        description=description,
    )
    item.full_clean()
    item.save()

    user.items_uploaded += 1

    for tag in item_tags:
        item.tags.add(tag)

    return UPLOAD_ACCEPTED
