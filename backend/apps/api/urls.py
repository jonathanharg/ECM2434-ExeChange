from django.urls import path

from . import route_login, route_register, route_upload, views

urlpatterns = [
    path("status", views.status),
    path("login", route_login.login),
    path("register", route_register.register),
    path("products", views.products),
    path("upload", route_upload.post)
]
