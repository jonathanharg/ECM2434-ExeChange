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
        fields = [
            "id",
            "owner",
            "caption",
            "image",
            "tags",
            "description",
            "created_at",
            "updated_at",
        ]


class TradeRequestSerializer(serializers.ModelSerializer):
    giver = UserSerializer()
    receiver = UserSerializer()
    trade_type = "REQUEST"

    class Meta:
        model = TradeRequest
        depth = 1
        fields = ["id", "trade_type", "giver", "receiver", "items", "message"]
