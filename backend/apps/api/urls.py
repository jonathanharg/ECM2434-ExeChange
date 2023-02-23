from django.urls import path

from . import route_login, route_register, route_upload, views, route_marketplace

urlpatterns = [
    path("status", views.status),
    path("login", route_login.login),
    path("register", route_register.register),
    path("products", route_marketplace.products),
    path("upload", route_upload.post),
]
