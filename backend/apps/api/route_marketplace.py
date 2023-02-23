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
from itertools import chain

@api_view(["GET"])
def products(request: HttpRequest) -> Response:
    # time.sleep(5)
    # toJSON() 
    data = [
        {
            "id": 1,
            "name": "Cowboy Hat",
            "href": "#",
            "imageSrc": "https://i.ebayimg.com/images/g/csYAAOSwl9xePWGM/s-l500.jpg",
            "tags": ["Cowboy", "Hat"],
        }
    ] * 13
    products = ClothingItem.objects.filter(tags__in=ItemTag.objects.all()).select_related('ItemTag').values_list('id', 'caption', 'tags__tag')
    product_captions = list(ClothingItem.objects.values())
    print(products)
    return JsonResponse(list(products), safe=False)
    # return 