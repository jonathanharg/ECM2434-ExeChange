import random

from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def status(request: HttpRequest) -> Response:
    msgArray = [
        "<h1>Wow! This code is so good!</h1>",
        "Exeter is Changing...",
        "Exchange with ExeChange",
        "Made by Vihan",
        "Made by Jonathan",
        "Made by Maddie",
        "Made by Gabby",
        "Made by Oggy",
        "Made by Harry",
        "This is so gamefied!",
        "Loading...",
        "Who put this here?",
        "//TODO: Remove these messsages",
        "where's the map???",
        "Tell your friends!",
        "Now with 10% more React!",
        "ExeChanging the game since 2023",
        "Est. 2023",
        "\"Be the ExeChange you want to see in the world.\" - Mahatma Gandhi",
        "ExeChange!"
    ]
    data = {"status": "OK", "message": {random.choice(msgArray)}}
    return Response(data)
