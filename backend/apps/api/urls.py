from django.urls import path

from . import views

urlpatterns = [
    path("status", views.status),
    path("login", views.login),
    path("register", views.register),
    path("products", views.products),
]
