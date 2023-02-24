from django.contrib.auth.models import User

from backend.settings import XP_IN_LEVEL


def get_user_level(user: User) -> int:
    return user.profile_level


def update_user_level(user: User) -> int:
    user.profile_level = user.profile_level + 1
    user.save()

    return user.profile_level


def get_user_xp(user: User) -> int:
    return user.current_xp


def update_user_xp(user: User, xp_to_add: int) -> int:
    """
    Takes an authenticated user, and updates the xp of that user.

    If a lower xp is returned than what a user started with, this also means that the user level has increased,
    as on a user level increase, xp is reset to zero.
    """
    new_xp = user.current_xp + xp_to_add

    while new_xp > XP_IN_LEVEL:
        update_user_level(user)
        new_xp = new_xp - 100

    user.current_xp = new_xp
    user.save()
