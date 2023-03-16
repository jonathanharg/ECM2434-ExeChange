import json
import os
from smtplib import SMTPDataError, SMTPRecipientsRefused, SMTPSenderRefused
from typing import List

import yagmail
from apps.api.models import ExeChangeUser
from yagmail.oauth2 import get_authorization

GOOGLE_CLIENT_ID = os.getenv("CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("CLIENT_SECRET")
GOOGLE_PROJECT_ID = os.getenv("PROJECT_ID")

GOOGLE_REFRESH_TOKEN, _, _ = get_authorization(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)


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
    if not os.path.exists("credentials.json"):
        # generating JSON file for oauth data
        oauth2_data = {
            "installed": {
                "client_id": GOOGLE_CLIENT_ID,
                "project_id": GOOGLE_PROJECT_ID,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uris": ["http://localhost"],
                "refresh_token": GOOGLE_REFRESH_TOKEN,
            }
        }

        with open("backend/apps/api/credentials.json", "w") as f:
            json.dump(oauth2_data, f)

    # email address to send to
    send_to_email_address = user.email

    # sender email address
    sender_email_address = "teamexechange@gmail.com"

    # instantiate a new instance of yagmail
    yag = yagmail.SMTP(user=sender_email_address, oauth2_file="credentials.json")

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
