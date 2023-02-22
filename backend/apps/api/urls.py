from apps.api.custom_routes import user_login, user_register
from django.urls import path

from . import views

urlpatterns = [
    path("status", views.status),
    path("login", user_login.login),
    path("register", user_register.register),
    path("products", views.products),
]
