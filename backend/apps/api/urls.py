from apps.api import route_login, route_register, views # type: ignore
from django.urls import path

urlpatterns = [
    path("status", views.status),
    path("login", route_login.login),
    path("register", route_register.register),
    path("products", views.products),
]
