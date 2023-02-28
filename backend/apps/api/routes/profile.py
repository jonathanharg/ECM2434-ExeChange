from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def trades(request: HttpRequest) -> Response:
    data = [
        {
            "id": 1,
            "initiator": "madsalad",
            "location": "Forum",
            "time": "12:00",
            "date": "03/02/23",
        }
    ] * 2
    return Response(data)
