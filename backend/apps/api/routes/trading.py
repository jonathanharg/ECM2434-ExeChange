from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.api.models import PendingTrade
from apps.api.models import ExeChangeUser
from apps.api.models import ClothingItem
from apps.api.authentication import authenticate_user
from django.shortcuts import get_object_or_404
from django.http.response import Http404

from datetime import datetime

@api_view(["POST"])
def trade(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return({
            "status": "BAD_REQUEST",
            "message": "user not authenticated"
        })
    
    acceptor = request.data["productOwnerId"]
    time = request.data["selectedTime"]["time"]
    date = request.data["selectedDates"]
    item_id = request.data["itemId"]
    location = request.data["selectedLocation"]["locationName"]

    time_test = datetime.strptime(time, "%H%M")
    if time_test < datetime.now():
        return Response({
            "status": "BAD_REQUEST",
            "message": "You are trying to trade in the past!",
        })

    try:
        acceptor_object = get_object_or_404(ExeChangeUser, id=acceptor)

        # A user cannot request their own item.
        if acceptor_object == authenticated_user:
            return Response({
                "status": "BAD_REQUEST",
                "message": "A user cannot request their own item!",
            })

        item_object = get_object_or_404(ClothingItem, id=item_id)

        new_trade = PendingTrade.objects.create(
            initiator=authenticated_user,
            acceptor=acceptor_object,
            time=time,
            date=date,
            item=item_object,
            location=location
        )

        new_trade.full_clean()
        new_trade.save()

        return Response({
            "status": "OK",
            "message": "trade saved successfully",
        })
    
    except Http404:
        return Response({
            "status": "BAD_REQUEST",
            "message": "item or acceptor object not found!",
        })