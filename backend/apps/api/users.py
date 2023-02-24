from django.contrib.auth.models import User

from .models import ExeChangeUser

def get_user_level(user: ExeChangeUser) -> int:
    return user.profile_level


def update_user_level(user: User) -> int:
    """
    Takes and authenticated user, and updates the level of that user.

    Args:
        user (User): An "authenticated" User object

    Returns:
        int: The new updated level of the user.
    """
    pass

def get_user_xp(user: User) -> int:
    """
    Takes an authenticated user, and returns the current xp of the user.

    Args:
        user (User): An "authenticated" User object.

    Returns:
        int: The current xp of the user.
    """
    pass

def update_user_xp(user: User) -> int:
    """
    Takes an authenticated user, and updates the xp of that user.

    If a lower xp is returned than what a user started with, this also means that the user level has increased,
    as on a user level increase, xp is reset to zero.

    Args:
        user (User): An "authenticated" User object.

    Returns:
        int: The new xp of a user.
    """
    pass