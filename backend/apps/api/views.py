from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def status(request):
    data = {"status": "OK", "message": "Coming soon..."}
    return Response(data)


@api_view(["POST"])
def login(request):
    # A basic response for a post request
    data = {"status": "OK", "message": "Recieved"}
    return Response(data)
