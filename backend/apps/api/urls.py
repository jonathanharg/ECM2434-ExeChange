from apps.api.routes import login, register
from django.urls import path

from . import views

urlpatterns = [
    path("status", views.status),
    path("login", login.login),
    path("register", register.register),
    path("products", views.products),
]
