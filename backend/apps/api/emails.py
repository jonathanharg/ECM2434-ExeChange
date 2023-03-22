from smtplib import SMTPDataError, SMTPRecipientsRefused, SMTPSenderRefused
from typing import List

from apps.api.models import ExeChangeUser
from django.conf import settings


def send_user_email(user: ExeChangeUser, subject: str, contents: List[str]) -> bool:  # type: ignore
    """
    This function sends an email to the email stored in the user object

    Args:
        user (ExeChangeUser): User to send email to
        subject (str): Subject line of email
        contents (List[str]): Contents of the email

    Returns:
        bool: Success or Failure
    """
    # send email
    try:
        settings.YAG.send(to=user.email, subject=subject, contents=contents)  # type: ignore
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

    except AttributeError:
        print("ERROR: YAG in settings was never set up")
        return False
