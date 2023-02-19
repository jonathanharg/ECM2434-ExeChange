import time
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
    data = [{"id": 1, 
            "name": "Cowboy Hat",
            "href": "#",
            "imageSrc":"https://d3kbgunirza9ax.cloudfront.net/8BHR3LYrGqw/f:jpg/c:3024:3024:nowe:0:504/rs:fill:720:720:0/aW1hZ2UvcHJvZHVjdC8yZTdkNzZlZS1lNjRkLTQ1YWMtYmI3MC0yZWY5MGZkMzVjYmMuanBlZw",
            "tags": ["Cowboy","Hat"],}] * 13
    return Response(data)
