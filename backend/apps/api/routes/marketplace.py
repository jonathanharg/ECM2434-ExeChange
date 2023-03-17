from apps.api.models import ClothingItem, ExeChangeUser, ItemTag
from apps.api.responses import INVALID_TAG, INVALID_USER
from apps.api.serializer import ClothingItemSerializer
from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view

# HOW TO FILTER MARKETPLACE
# Everything: /api/marketplace
# By userID: /api/marketplace?user=42
# By TagIDs: /api/marketplace?tag=6+8
# By both: /api/marketplace?user=17&tags=3+8

# TODO: Paginate, e.g. page=1, page=2, max no per page maybe like 20?
# TODO: Dont show items that are in an accepted trade


@api_view(["GET"])
def marketplace(request: HttpRequest) -> JsonResponse:
    # Start off querying all items
    queryset = ClothingItem.objects.all().order_by('-created_at')

    # NOTE: Compatibility test REMOVE?
    if (request.query_params is not None) & request.get_full_path().startswith(
        "/api/marketplace"
    ):
        # If tags are provided, get those tags then filter by them
        if "tags" in request.query_params:
            tags = request.query_params["tags"].split(" ")
            try:
                tags = list(map(lambda x: ItemTag.objects.get(id=x), tags))
            except (ItemTag.DoesNotExist, ValueError) as _:
                return INVALID_TAG
            queryset = queryset.filter(tags__in=tags)

        # If a user is provided, get that user then filter by them
        if "user" in request.query_params:
            user = request.query_params["user"]
            try:
                user = ExeChangeUser.objects.get(id=user)
            except (ExeChangeUser.DoesNotExist, ValueError) as _:
                return INVALID_USER
            queryset = queryset.filter(owner=user)

    serializer = ClothingItemSerializer(queryset, many=True)
    return JsonResponse(serializer.data, safe=False)
