from apps.api.models import ClothingItem, ItemTag
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication  # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken  # type: ignore


@api_view(["POST"])
def post(request: HttpRequest) -> Response:
    '''
    Taking upload data and using the ClothingItem model, this saves caption, image, and tag data using the save method. 

    Args:
        request (HttpRequest): JSON data from frontend 

    Returns: 
        Tbd...

    '''
    caption = request.data["caption"]
    tags = request.data.getlist("tags[]") #gets tags from user input 
    try:            
        item = ClothingItem.objects.create(caption=caption) #create an item object
        item.save()
        item.full_clean()

        for tag in tags:
            taggedItem = item.tags.create(tag= tag) #create and add tags (tag objects) to existing item object

        print(item.tags.all())
        print(ClothingItem.objects.all().values())

        data = {
            "status": "OK",
            "message": "Submission accepted",
            "caption": {caption},
        }
    except ValidationError as e:
        data = {
            "status": "INVALID_LENGTH",
            "message": "Submission Denied, Caption must be under a 100 characters! ",
            "caption": {caption},
        }
        print(e)
    return Response(data)
