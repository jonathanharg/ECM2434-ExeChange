from django.urls import path

from apps.api.routes import upload
from . import views

urlpatterns = [
    path("status", views.status),
    path("login", views.login),
    path("register", views.register),
    path("products", views.products),
    path("upload", upload.post)
]
