from apps.api.authentication import authenticate_user
from apps.api.models import Notification
from django.http import HttpRequest
from django.http.response import Http404
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED


@api_view(["GET"])
def get_user_notifications(request: HttpRequest) -> Response:
    """
    Filter all notification based on a user from token in request
    """
    authenticated_user = authenticate_user(request)

    if authenticated_user is None:
        return Response(NOT_LOGGED_IN, status=HTTP_401_UNAUTHORIZED)

    # get all notifications for user
    user_notifications = Notification.objects.filter(user=authenticated_user)

    res = []
    for notification in user_notifications:
        res.append(
            {
                "id": notification.id,
                "notification_type": str(notification.notification_type),
                "text": str(notification.text),
                "link": str(notification.link),
            }
        )

    return Response(
        {
            "status": "OK",
            "message": "Successfully retrieved notifications",
            "notifications": res,
        }
    )


NOT_LOGGED_IN = {"status": "NOT_LOGGED_IN", "message": "User is not logged in"}
