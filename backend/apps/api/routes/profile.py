from django.http import HttpRequest, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view



@api_view(["GET"])
def trades(request:HttpRequest) -> Response:
    print("TESLTKADL?KSJD")
    data = [{
        "id": 1,
        "initiator":"madsalad",
        "location":"Forum",
        "time":"12:00",
        "date":"03/02/23",
    }] * 2
    return Response(data)

