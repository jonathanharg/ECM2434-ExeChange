from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ClothingItem
from .serializer import ClothingItemSerializer


@api_view(["GET"])
def products(request: HttpRequest) -> Response:
    queryset = ClothingItem.objects.all()
    serializer = ClothingItemSerializer(queryset, many=True)
    return JsonResponse(serializer.data, safe=False)
