from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import ClothingItem, TradeRequest


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

class TradeRequestSerializer(serializers.ModelSerializer):
    from_user = UserSerializer()
    to_user = UserSerializer()

    class Meta:
        model = TradeRequest
        depth = 1
        # fields = ["giving", "receiving", "from_location", "from_days", "from_times", "from_user", "to_user"]
        fields = ["id", "from_user", "to_user", "receiving", "giving"]