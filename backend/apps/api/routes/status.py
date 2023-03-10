import random

from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def status(request: HttpRequest) -> Response:
    WELCOME_MESSAGES = [
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
        "ExeChanging the game.",
        "Est. 2023",
        '"Be the ExeChange you want to see in the world." - Mahatma Gandhi',
        "ExeChange!",
        '"I got bored one day, then I put everything on ExeChange... everything."',
        '"I\'m Learning To Recycle Like You."',
        "Reduce, Reuse & React!",
        "Featuring a better login system & navbar than ELE!",
        "Ring ring!",
        "🩳 🔄 👕  👉👈🥺",
        "♻️",
        "EVERYTHING is EXECHANGEing",
        "Wow it's a deal!",
        '"The measure of intelligence is the ability to ExeChange." - Albert Einstein',
        '"We are the ExeChange that we seek" - Barack Obama',
        "Moving in silence, big things coming.",
        "Only the real ones know",
        "\"The world's ExeChanging. It's time we ExeChange, too.\" - Spider-Man",
    ]
    data = {"status": "OK", "message": {random.choice(WELCOME_MESSAGES)}}
    return Response(data)
