from apps.api.authentication import authenticate_user
from apps.api.models import ClothingItem, ExeChangeUser, PendingTrade, TradeRequest
from django.http import HttpRequest, JsonResponse
from django.http.response import Http404
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)

@api_view(["POST"])
def new(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            NOT_LOGGED_IN,
            status=HTTP_401_UNAUTHORIZED,
        )
    
    # We can ignore the type here since Django doesn't include it
    form = request.data  # type: ignore

    #check values exists, get_user is not self user
    giving = form.getlist("giving[]")
    get_items = list(map(lambda x: ClothingItem.objects.get(value=x), get_items))
    to_user = get_object_or_404(ExeChangeUser, id=form["to_user"])
    print(to_user)
    print(get_items)
    
    return Response()

@api_view(["GET"])
def requests(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            NOT_LOGGED_IN,
            status=HTTP_401_UNAUTHORIZED,
        )
    
    return JsonResponse(TradeRequest.objects.all(), safe= False)

@api_view(["POST"])
def trade(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response({"status": "BAD_REQUEST", "message": "user not authenticated"})

    acceptor = request.data["productOwnerId"]  # type: ignore
    time = request.data["selectedTime"]["time"]  # type: ignore
    date = request.data["selectedDates"]  # type: ignore
    item_id = request.data["itemId"]  # type: ignore
    location = request.data["selectedLocation"]["locationName"]  # type: ignore

    # time verification is still todo
    # date = date.split("T")[0]
    # date = date + " " + time + "Z"

    # date_object = datetime.strptime(date, "%Y-%m-%d %H:%M%Z")

    # if date_object <= datetime.now():
    #     return Response({
    #         "status": "BAD_REQUEST",
    #         "message": "Cannot trade in the past!"
    #     })

    try:
        acceptor_object = get_object_or_404(ExeChangeUser, id=acceptor)

        # A user cannot request their own item.
        if acceptor_object == authenticated_user:
            return Response(
                {
                    "status": "BAD_REQUEST",
                    "message": "A user cannot request their own item!",
                }
            )

        item_object = get_object_or_404(ClothingItem, id=item_id)

        new_trade = PendingTrade.objects.create(
            initiator=authenticated_user,
            acceptor=acceptor_object,
            time=time,
            date=date,
            item=item_object,
            location=location,
        )

        new_trade.full_clean()
        new_trade.save()
        return Response(
            {
                "status": "OK",
                "message": "trade saved successfully",
            }
        )

    except Http404:
        return Response(
            {
                "status": "BAD_REQUEST",
                "message": "item or acceptor object not found!",
            }
        )


NOT_LOGGED_IN = {
    "status": "NOT_LOGGED_IN",
    "message": "You need to be logged in to trade.",
}
