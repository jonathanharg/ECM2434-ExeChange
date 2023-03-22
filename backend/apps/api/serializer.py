from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Achievement, ClothingItem


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username"]


class ClothingItemSerializer(serializers.ModelSerializer):
    owner = UserSerializer()

    class Meta:
        model = ClothingItem
        depth = 1
        fields = ["caption", "tags", "owner", "id", "image", "created_at", "updated_at"]


class UserProfileDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        depth = 1
        fields = ["id", "username", "achievements", "current_xp", "profile_level"]
