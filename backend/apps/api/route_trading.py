from apps.api.authentication import authenticate_user
from apps.api.models import ExeChangeUser, PendingTrade
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response

"""
def trading

Recieves a trade request and adds it to a pending trades model.
- This will contain who is part of the trade, and what items are in the trade. -> potentially tag the item as "in potential trade"

"""


@api_view(["POST"])
def trading(request: HttpRequest) -> Response:
    authenticated_initiator = authenticate_user(request)

    if authenticated_initiator is None:
        return Response(
            {
                "STATUS": "USER_NOT_AUTHENTICATED",
                "message": "Token sent was not valid",
            }
        )

    acceptor = request.data["user_initiator"]
    acceptor_object = ExeChangeUser.objects.get(username=str(acceptor))

    # Gather list of items initator wants to trade

    # Gather list of items acceptor wants to trade

    pending_trade = PendingTrade.objects.create(
        initiator=authenticated_initiator,
        acceptor=acceptor_object,
        # Link to initiator items
        # Link to acceptor items
    )


"""
def verify

When both members of the trade have verified that the trade has been succesful, then items can be removed from the marketplace, (item model)
and xp added to users accordingly.

How to know when both parties have verified -> check the user id's!, only when both have completed, this can be stored in the pending trades model who has verified.

"""
