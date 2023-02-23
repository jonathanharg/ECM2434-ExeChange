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
        },
        {
            "id": 2,
            "name": "Cowboy Hat",
            "href": "#",
            "imageSrc": "https://i.ebayimg.com/images/g/csYAAOSwl9xePWGM/s-l500.jpg",
            "tags": ["Cowboy", "Hat"],
        },
        {
            "id": 3,
            "name": "Cowboy Hat",
            "href": "#",
            "imageSrc": "https://i.ebayimg.com/images/g/csYAAOSwl9xePWGM/s-l500.jpg",
            "tags": ["Cowboy", "Hat"],
        },
        {
            "id": 4,
            "name": "Cowboy Hat",
            "href": "#",
            "imageSrc": "https://i.ebayimg.com/images/g/csYAAOSwl9xePWGM/s-l500.jpg",
            "tags": ["Cowboy", "Hat"],
        },
        {
            "id": 5,
            "name": "Cowboy Hat",
            "href": "#",
            "imageSrc": "https://i.ebayimg.com/images/g/csYAAOSwl9xePWGM/s-l500.jpg",
            "tags": ["Cowboy", "Hat"],
        },
        {
            "id": 6,
            "name": "Cowboy Hat",
            "href": "#",
            "imageSrc": "https://i.ebayimg.com/images/g/csYAAOSwl9xePWGM/s-l500.jpg",
            "tags": ["Cowboy", "Hat"],
        },
    ]
    return Response(data)
