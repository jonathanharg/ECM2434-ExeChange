from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.api.models import PendingTrade
from apps.api.models import ExeChangeUser
from apps.api.models import ClothingItem
from apps.api.authentication import authenticate_user

@api_view(["POST"])
def trade(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return({
            "status": "BAD_REQUEST",
            "message": "user not authenticated"
        })
    
    acceptor = request.data["acceptor"]
    time = request.data["time"]
    date = request.data["date"]
    item_id = request.data["item_id"]

    #Should only return one value !
    acceptor_object = ExeChangeUser.objects.filter(username=str(acceptor)).values()
    item_object = ClothingItem.objects.filter(id=str(item_id)).values()

    PendingTrade.objects.create(
        initiator=authenticated_user,
        acceptor=acceptor_object,
        time=time,
        date=date,
        item=item_object
    )

    PendingTrade.full_clean()
    PendingTrade.save()

    return Response({
        "status": "GOOD",
        "message": "trade saved successfully",
    })