from apps.api.models import ClothingItem
from apps.api.serializer import ClothingItemSerializer
from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view


@api_view(["GET"])
def marketplace(request: HttpRequest) -> JsonResponse:
    queryset = ClothingItem.objects.all()
    serializer = ClothingItemSerializer(queryset, many=True)
    return JsonResponse(serializer.data, safe=False)
