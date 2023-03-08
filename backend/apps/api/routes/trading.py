from apps.api.authentication import authenticate_user
from django.core import serializers
from apps.api.models import (
    ClothingItem,
    ExeChangeUser,
    Location,
    PendingTrade,
    TradeRequest,
)
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

from apps.api.serializer import TradeRequestSerializer


@api_view(["POST"])
def new(request: HttpRequest) -> Response:
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(
            NOT_LOGGED_IN,
            status=HTTP_401_UNAUTHORIZED,
        )

    get_items = list(
        map(lambda x: ClothingItem.objects.get(id=x), request.data["receiving"])
    )
    to_user = get_object_or_404(ExeChangeUser, id=request.data["to_user"])
    day_availability = request.data["my_day_availability"][0]
    # time_availability = request.data["my_time_availability"][0]
    # location_availability = list(
    #     map(
    #         lambda x: Location.objects.get(name=x),
    #         request.data["my_location_availability"],
    #     )
    # )

    newobj = TradeRequest.objects.create(
        from_user=authenticated_user,
        to_user=to_user,
        # giving=giving,
        # receiving=get_items,
        # from_location=location_availability,
        # from_days=day_availability,  # BUGGED: TODO: BROKEN: FIXME: JANK: make this an array
        # from_times=time_availability,
    )
    newobj.giving.set([])
    newobj.receiving.set(get_items)

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

    from_user = TradeRequest.objects.filter(from_user=authenticated_user);
    from_user_serializer = TradeRequestSerializer(from_user, many=True)
    to_user = TradeRequest.objects.filter(to_user=authenticated_user);
    to_user_serializer = TradeRequestSerializer(to_user, many=True)
    data = {
        "sent" : from_user_serializer.data,
        "received": to_user_serializer.data
    }
    return JsonResponse(data, safe=False)


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
