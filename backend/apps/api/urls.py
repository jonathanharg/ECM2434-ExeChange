from django.urls import path

from apps.api.routes import tags, login, marketplace, register, upload, status

urlpatterns = [
    path("status", status.status),
    path("login", login.login),
    path("register", register.register),
    path("products", marketplace.marketplace),
    path("upload", upload.post),
    path("tags", tags.tags),
]
