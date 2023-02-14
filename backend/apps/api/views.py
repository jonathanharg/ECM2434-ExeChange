from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def status(request):
    data = {"status": "OK", "message": "Coming soon..."}
    return Response(data)
