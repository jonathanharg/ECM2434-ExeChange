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
from django.http import JsonResponse


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

        for tag_to_add in tags:

            taggedItem = ItemTag.objects.create(tag = tag_to_add)
            taggedItem.save()
            taggedItem.full_clean()
            item.tags.add(taggedItem)
        
        # for item in ClothingItem.objects.all(): 
        #     print(item.tags.all())

        # print()

        data = {
            "status": "OK",
            "message": "Submission accepted",
            "caption": {caption},
        }
    except ValidationError as e:
        data = {
            "status": "INVALID_LENGTH",
            "message": "Submission Denied, {e}",
            "caption": {caption},
        }
        print(e)
    return Response(data)
