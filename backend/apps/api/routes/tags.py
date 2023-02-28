from apps.api.models import ItemTag
from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view


@api_view(["GET"])
def tags(request: HttpRequest) -> JsonResponse:
    return JsonResponse(list(ItemTag.objects.values()), safe=False)
