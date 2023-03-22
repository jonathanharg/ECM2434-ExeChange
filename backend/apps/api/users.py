# type: ignore
from apps.api.models import ExeChangeUser, Notification, NotificationType
from django.conf import settings


def update_user_level(user: ExeChangeUser) -> int | None:  # type: ignore
    if user is None:
        return None

    user.profile_level = user.profile_level + 1
    user.save()

    return user.profile_level  # type: ignore


def update_user_xp(user: ExeChangeUser, xp_to_add: int) -> int | None:  # type: ignore
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

    return user.current_xp  # type: ignore
