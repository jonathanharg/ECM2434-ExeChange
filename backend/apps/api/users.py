import json
import os
from smtplib import SMTPDataError, SMTPRecipientsRefused, SMTPSenderRefused
from typing import List

import yagmail
from apps.api.models import ExeChangeUser

from backend.settings import XP_IN_LEVEL


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

    while new_xp > XP_IN_LEVEL:
        update_user_level(user)
        new_xp = new_xp - XP_IN_LEVEL

    user.current_xp = new_xp
    user.save()

    return user.current_xp


def send_user_email(user: ExeChangeUser, subject: str, contents: List[str]) -> bool:
    """
    This function sends an email to the email stored in the user object

    Args:
        user (ExeChangeUser): User to send email to
        subject (str): Subject line of email
        contents (List[str]): Contents of the email

    Returns:
        bool: Success or Failure
    """
    # generting credentials JSON file
    client_id = os.getenv("CLIENT_ID")
    client_secret = os.getenv("CLIENT_SECRET")
    project_id = os.getenv("PROJECT_ID")

    oauth2_data = {
        "installed": {
            "client_id": client_id,
            "project_id": project_id,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_secret": client_secret,
            "redirect_uris": ["http://localhost"],
        }
    }

    with open("backend/apps/api/credentials.json", "w") as f:
        json.dump(oauth2_data, f)

    # email address to send to
    send_to_email_address = user.email

    # sender email address
    sender_email_address = "teamexechange@gmail.com"

    # instantiate a new instance of yagmail
    yag = yagmail.SMTP(user=sender_email_address, oauth2_file="~/backend/apps/api/credentials.json")

    # send email
    try:
        yag.send(to=send_to_email_address, subject=subject, contents=contents)
        return True

    except SMTPRecipientsRefused:
        print("ERROR: Recipient(s) refused the email")
        return False

    except SMTPSenderRefused:
        print("ERROR: Sender refused to send the email")
        return False

    except SMTPDataError:
        print("ERROR: SMTP server did not accept the data")
        return False

    except:
        print("UNKOWN ERROR")
        return False
