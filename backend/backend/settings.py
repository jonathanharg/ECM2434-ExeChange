"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.1.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

import json
import os
import sys
from datetime import timedelta
from pathlib import Path

import yagmail

# Load environment variables from the users .env file
from dotenv import load_dotenv
from yagmail.oauth2 import get_authorization

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR_FRONTEND = Path(__file__).resolve().parent.parent.parent

APPS_DIR = os.path.join(BASE_DIR, "backend/apps/")
sys.path.insert(0, APPS_DIR)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
DEFAULT_SECRET_KEY = (
    "django-insecure-ep*!1h*9o8wd936&ys3qws35j3f1at@ncqfdld@)i25!kp77-l"
)
SECRET_KEY = os.getenv("SECRET_KEY", DEFAULT_SECRET_KEY)

if SECRET_KEY == DEFAULT_SECRET_KEY:
    # Building the docker image errors when it builds if there is no SECRET_KEY set
    # Here we set the secret key to a default, this is overwritten by environment variables
    # Warn the user if the default secret key is not overwritten.
    print("WARNING! No SECRET_KEY set!")
    print(
        "If you are running in production stop the server IMMEDIATELY and set the SECRET_KEY using an environment variable!"
    )


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", "False") == "True"

# CUSTOM SETTINGS
FORCE_SERVE_STATIC = os.getenv("FORCE_SERVE_STATIC", "False") == "True"

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "apps.frontend",
    "apps.api",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

USE_POSTGRES_DB = os.getenv("USE_POSTGRES_DB", "False") == "True"
POSTGRES_NAME = os.getenv("POSTGRES_NAME")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")

DATABASES = {
    "dev": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    },
    "production": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": POSTGRES_NAME,
        "HOST": POSTGRES_HOST,
        "PORT": POSTGRES_PORT,
        "USER": POSTGRES_USER,
        "PASSWORD": POSTGRES_PASSWORD,
    },
}

DATABASES["default"] = DATABASES["production" if (USE_POSTGRES_DB) else "dev"]

# Rest Framework Options
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

# Simple JWT Options
SIMPLE_JWT = {
    "SIGNING_KEY": SECRET_KEY,
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=120),
    "AUTH_HEADER_TYPES": ("Bearer"),
    "AUTH_HEADER_NAME": "_auth",
}

# Setting AUTH_USER_MODEL to customer made model
AUTH_USER_MODEL = "api.ExeChangeUser"

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

# These are the settings you should have for everything to work properly.
# Add these to your main settings.py file, or modify it accordingly.

# Hosts that Django will accept requests to
ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "").split(" ")
CSRF_TRUSTED_ORIGINS = os.environ.get("CSRF_TRUSTED_ORIGINS", "http://127.0.0.1").split(
    " "
)

# Needed for 'debug' to be available inside templates.
# https://docs.djangoproject.com/en/3.2/ref/templates/api/#django-template-context-processors-debug
INTERNAL_IPS = ["127.0.0.1"]

# Vite App Dir: Let Django know where the frontend files are
VITE_APP_DIR = BASE_DIR_FRONTEND / "frontend"

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

# You may change these, but it's important that the dist folder is includedself.
# If it's not, collectstatic won't copy your bundle to production.

STATIC_URL = "/static/"
STATICFILES_DIRS = [VITE_APP_DIR / "dist", BASE_DIR / "media"]

if DEBUG:
    # Serve all static files from the frontend in debug mode
    STATICFILES_DIRS.append(VITE_APP_DIR)

STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_ROOT = BASE_DIR / "media"
MEDIA_URL = "/media/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom setting values

XP_IN_LEVEL = 100

DOMAIN_NAME = (
    "http://127.0.0.1:8000" if DEBUG is True else "https://www.exechange.co.uk"
)

# GMAIL CREDENTIALS SETUP
SEND_VERIFICATION_EMAIL = os.getenv("SEND_VERIFICATION_EMAIL") == "True"

if SEND_VERIFICATION_EMAIL:
    GOOGLE_CLIENT_ID = os.getenv("CLIENT_ID", "NONE")
    GOOGLE_CLIENT_SECRET = os.getenv("CLIENT_SECRET", "NONE")
    GOOGLE_PROJECT_ID = os.getenv("PROJECT_ID", "NONE")

    if str(GOOGLE_CLIENT_ID) == "NONE":
        print("ERROR: need to set google client id")
    elif str(GOOGLE_CLIENT_SECRET) == "NONE":
        print("ERROR: need to set google client secret")
    elif str(GOOGLE_PROJECT_ID) == "NONE":
        print("ERROR: need to set google project id")
    else:
        if not os.path.exists("credentials.json"):
            GOOGLE_REFRESH_TOKEN, _, _ = get_authorization(
                GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
            )

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

            with open(  # pylint: disable=unspecified-encoding
                "credentials.json", "w"
            ) as f:
                json.dump(oauth2_data, f)

        # sender email address
        USER = "teamexechange@gmail.com"
        SEND_FROM = "team@exechange.co.uk"

        # instantiate a new instance of yagmail
        YAG = yagmail.SMTP(user={USER: SEND_FROM}, oauth2_file="credentials.json")
