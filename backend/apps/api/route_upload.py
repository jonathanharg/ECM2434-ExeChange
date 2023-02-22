from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication  # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken  # type: ignore
from models import ClothingItem, ClothingOwner

@api_view(["POST"])
def post(request: HttpRequest) -> Response:

    caption = request.data["caption"]
    # tags = request.data["tags"] currently recieveing null 
    
    data = {"status": "OK", 
            "message": "Submission accepted",
            "caption":{caption},
            }
    
    return Response(data)
