from apps.api.routes import (
    login,
    marketplace,
    profile,
    register,
    status,
    constants,
    trading,
    upload,
)
from django.urls import path

urlpatterns = [
    path("status", status.status),
    path("login", login.login),
    path("register", register.register),
    path("products", marketplace.marketplace),
    path("upload", upload.post),
    path("tags", constants.tags),
    path("locations", constants.locations),
    path("profiledata", profile.get_profile_data),
    path("trade/new", trading.request_trade),
    path("trade/requests", trading.get_requests),
]
