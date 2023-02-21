from django.urls import path

from . import views

urlpatterns = [path("status", views.status), path("products", views.products)]
