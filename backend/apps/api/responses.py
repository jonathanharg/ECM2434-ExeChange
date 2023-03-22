from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
    HTTP_409_CONFLICT,
    HTTP_500_INTERNAL_SERVER_ERROR,
)

NOT_LOGGED_IN = Response(
    {
        "status": "NOT_LOGGED_IN",
        "message": "You need to be logged in to do this!",
    },
    status=HTTP_401_UNAUTHORIZED,
)


INVALID_TRADE_REQUEST = Response(
    {
        "status": "INVALID_TRADE_REQUEST",
        "message": "Please include a valid trade users.",
    },
    status=HTTP_400_BAD_REQUEST,
)

INVALID_TRADE_ACCEPT = Response(
    {
        "status": "INVALID_TRADE_ACCEPT",
        "message": "Please include a valid receiver exchanging, date, time and location.",
    },
    status=HTTP_400_BAD_REQUEST,
)

INVALID_TRADE_SELF = Response(
    {
        "status": "INVALID_TRADE_SELF",
        "message": "You can't trade with yourself silly!",
    },
    status=HTTP_400_BAD_REQUEST,
)

INVALID_TRADE_ITEMS = Response(
    {
        "status": "INVALID_TRADE_ITEMS",
        "message": "This person does not have all these items!",
    },
    status=HTTP_400_BAD_REQUEST,
)

CONFIRM_TRADE_REJECT = Response(
    {
        "status": "CONFIRM_TRADE_REJECT",
        "message": 'Confirm you want to reject the trade with "reject": True',
    },
    status=HTTP_400_BAD_REQUEST,
)

OK = Response(
    {"status": "OK"},
    status=HTTP_200_OK,
)

TRADE_NOT_FOUND = Response(
    {"status": "TRADE_NOT_FOUND", "message": "Could not find the trade."},
    status=HTTP_404_NOT_FOUND,
)

INVALID_LOCATION = Response(
    {"status": "INVALID_LOCATION", "message": "Could not find the location."},
    status=HTTP_400_BAD_REQUEST,
)

INVALID_TIME = Response(
    {"status": "INVALID_TIME", "message": "The time is not valid."},
    status=HTTP_400_BAD_REQUEST,
)


INVALID_UPLOAD_REQUEST = Response(
    {
        "status": "INVALID_UPLOAD_REQUEST",
        "message": "Please include a valid image, caption and at least one valid tag.",
    },
    status=HTTP_400_BAD_REQUEST,
)

INVALID_UPLOAD_CAPTION = Response(
    {
        "status": "INVALID_UPLOAD_CAPTION",
        "message": "Upload captions must not be more than 100 characters long or less than 5.",
    },
    status=HTTP_400_BAD_REQUEST,
)


INVALID_UPLOAD_DESCRIPTION = Response(
    {
        "status": "INVALID_UPLOAD_DESCRIPTION",
        "message": "Upload descriptions must not be more than 280 characters long",
    },
    status=HTTP_400_BAD_REQUEST,
)

INVALID_TAG = Response(
    {"status": "INVALID_TAG", "message": "Not all tags provided were valid."},
    status=HTTP_400_BAD_REQUEST,
)

UPLOAD_ACCEPTED = Response(
    {
        "status": "UPLOAD_ACCEPTED",
        "message": "Submission accepted",
    },
    status=HTTP_201_CREATED,
)


INVALID_UPLOAD_IMAGE_FORMAT = Response(
    {
        "status": "INVALID_UPLOAD_IMAGE_FORMAT",
        "message": "The image format cannot be opened or identified!",
    },
    status=HTTP_400_BAD_REQUEST,
)

INVALID_UPLOAD_IMAGE_SIZE = Response(
    {
        "status": "INVALID_UPLOAD_IMAGE_SIZE",
        "message": "The image should be at least 375 by 500 pixels.",
    },
    status=HTTP_400_BAD_REQUEST,
)

ITEM_ALREADY_REQUESTED = Response(
    {
        "status": "ITEM_ALREADY_REQUESTED",
        "message": "You have already requested the item.",
    },
    status=HTTP_400_BAD_REQUEST,
)

ITEM_ALREADY_ACCEPTED = Response(
    {
        "status": "ITEM_ALREADY_ACCEPTED",
        "message": "One or more of the requested items is already in an accepted trade.",
    },
    status=HTTP_409_CONFLICT,
)

INVALID_TOO_EARLY = Response(
    {
        "status": "INVALID_TOO_EARLY",
        "message": "You are too early to arrive to this trade.",
    },
    status=HTTP_400_BAD_REQUEST,
)

INVALID_USER = Response(
    {
        "status": "INVALID_USER",
        "message": "The specified user is not valid.",
    },
    status=HTTP_400_BAD_REQUEST,
)

DATABASE_TRANSACTION_ERROR = Response(
    {
        "status": "DATABASE_TRANSACTION_ERROR",
        "message": "An unknown database transaction error occurred.",
    },
    status=HTTP_500_INTERNAL_SERVER_ERROR,
)

TRADERS_NOT_THERE = Response(
    {
        "status": "TRADERS_NOT_THERE",
        "message": "Not all traders are at the trade location.",
        "there": False,
    },
    status=HTTP_200_OK,
)

INVALID_TRADE_CONFIRMATION = Response(
    {
        "status": "INVALID_TRADE_CONFIRMATION",
        "message": "Invalid trade confirmation.",
    },
    status=HTTP_400_BAD_REQUEST,
)

INCORRECT_TRADE_CONFIRMATION_CODE = Response(
    {
        "status": "INCORRECT_TRADE_CONFIRMATION_CODE",
        "message": "Incorrect trade confirmation code.",
    },
    status=HTTP_400_BAD_REQUEST,
)
