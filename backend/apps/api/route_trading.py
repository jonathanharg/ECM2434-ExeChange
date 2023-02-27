from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import PendingTrade
from api.models import ExeChangeUser
'''
def trading

Recieves a trade request and adds it to a pending trades model.
- This will contain who is part of the trade, and what items are in the trade. -> potentially tag the item as "in potential trade"

'''
@api_view(["POST"])
def trading(request: HttpRequest) -> Response:
    initiator = request.data["user_acceptor"]
    acceptor = request.data["user_initiator"]

    initiator_object = ExeChangeUser.objects.get()

    pending_trade = PendingTrade.objects.create()



'''
def verify

When both members of the trade have verified that the trade has been succesful, then items can be removed from the marketplace, (item model)
and xp added to users accordingly.

How to know when both parties have verified -> check the user id's!, only when both have completed, this can be stored in the pending trades model who has verified.

'''