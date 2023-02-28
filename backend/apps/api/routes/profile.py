from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apps.api.authentication import authenticate_user

from apps.api.models import PendingTrade, ExeChangeUser


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

@api_view(["GET"])
def trade_requests(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response({
            "status": "BAD_REQUEST",
            "message": "User not authenticated",
        })
    
    pending_trades = PendingTrade.objects.filter(acceptor=authenticated_user).values()

    data = []

    for pending_trade in pending_trades:
        initiator_username = get_object_or_404(ExeChangeUser, id=pending_trade["initiator_id"]).username
        pending_trade_date = pending_trade["date"].strftime("%d/%m/%Y")

        data.append({
            "id": pending_trade["id"],
            "initiator": initiator_username,
            "location": pending_trade["location"],
            "time": pending_trade["time"],
            "date": pending_trade_date
        })

    return Response(data)
    
