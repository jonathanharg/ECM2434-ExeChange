from apps.api.models import ExeChangeUser, Notification, NotificationType
from apps.api.emails import send_user_email
from django.conf import settings


def notification_email(user: ExeChangeUser, notification: Notification):
    """
    Send an email with notification type, text and link that they can follow

    Args:
        user (ExeChangeUser): User to send email to
        notification_type (NotificationType): _description_
    """
    link = create_notification_link(notification_type=notification.notification_type)

    line1 = f"Hello {user.username}, you have a new notification!"
    line2 = f"{notification.notification_type}, {notification.text}"
    line3 = f"Please check them out on the website here: {link}"

    send_user_email(user, "ExeChange Notification", [line1, line2, line3])


def create_notification_link(notification_type: NotificationType) -> str:
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
