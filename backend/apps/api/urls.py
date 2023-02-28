from apps.api.routes import login, marketplace, register, status, tags, upload, trading, upload, profile
from django.urls import path

urlpatterns = [
    path("status", status.status),
    path("login", login.login),
    path("register", register.register),
    path("products", marketplace.marketplace),
    path("upload", upload.post),
    path("tags", tags.tags),
    path("trade", trading.trade),
    path("profile", profile.trade_requests),
]
