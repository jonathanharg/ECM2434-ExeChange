from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view



@api_view(["GET"])
def profile(request: HttpRequest) -> JsonResponse:

    return JsonResponse()