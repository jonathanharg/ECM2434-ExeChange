from django.urls import path

from . import views
from apps.api.routes import login, register

urlpatterns = [
    path("status", views.status),
    path("login", login.login),
    path("register", register.register),
    path("loggedin", views.logged_in),
    path("products", views.products),
]
