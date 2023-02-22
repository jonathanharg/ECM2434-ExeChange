from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def status(request: HttpRequest) -> Response:
    data = {"status": "OK", "message": "Coming soon..."}
    return Response(data)


@api_view(["GET"])
def products(request: HttpRequest) -> Response:
    # time.sleep(5)
    data = [
        {
            "id": 1,
            "name": "Cowboy Hat",
            "href": "#",
            "imageSrc": "https://i.ebayimg.com/images/g/csYAAOSwl9xePWGM/s-l500.jpg",
            "tags": ["Cowboy", "Hat"],
        }
    ] * 13
    return Response(data)
