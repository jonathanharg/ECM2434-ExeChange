# type: ignore
from apps.api.models import ExeChangeUser, Notification, NotificationType
from django.conf import settings


def create_notification_link(
    user: ExeChangeUser, notification_type: NotificationType
) -> str:
    """
    Generate link for a notification based on user and notification_type
    """
    if notification_type == NotificationType.TRADE:
        link = settings.DOMAIN_NAME + "/tradecentre"
    elif (
        notification_type == NotificationType.ACHIEVEMENT_UNLOCKED
        or notification_type == NotificationType.LOCATION_UNLOCKED
        or notification_type == NotificationType.LEVEL_UP
    ):
        link = settings.DOMAIN_NAME + "/profile"
    else:
        raise ValueError("Type given to create link is not correct!")

    return link


def create_user_notification(
    user: ExeChangeUser, notification_type: NotificationType
) -> Notification | None:
    """
    Create a new notification

    Args:
        user (ExeChangeUser): User to notify
        type (NotificationType): Type of notification

    Returns:
        Notification: The notification object created if successful
    """
    try:
        link = create_notification_link(user, notification_type)
        new_notification = Notification.objects.create(
            user=user,
            text=notification_type.label,
            notification_type=notification_type,
            link=link,
        )
    except ValueError as e:
        print("ERROR: type given is not correct, check models.py")
        print(f"More info: {e}")
        new_notification = None

    return new_notification


def update_user_level(user: ExeChangeUser) -> int | None:
    if user is None:
        return None

    user.profile_level = user.profile_level + 1
    user.save()

    return user.profile_level


def update_user_xp(user: ExeChangeUser, xp_to_add: int) -> int | None:
    """
    Takes an authenticated user, and updates the xp of that user.

    If a lower xp is returned than what a user started with, this also means that the user level has increased,
    as on a user level increase, xp is reset to zero.
    """
    if user is None:
        return None

    new_xp = user.current_xp + xp_to_add

    while new_xp > settings.XP_IN_LEVEL:
        update_user_level(user)
        new_xp = new_xp - settings.XP_IN_LEVEL

    user.current_xp = new_xp
    user.save()

    return user.current_xp
