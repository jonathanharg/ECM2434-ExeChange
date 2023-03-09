from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import ClothingItem, Trade


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

# TODO: Update
class TradeSerializer(serializers.ModelSerializer):
    giver = UserSerializer()
    receiver = UserSerializer()

    class Meta:
        model = Trade
        depth = 1
        fields = ["id", "giver", "receiver", "giver_giving", "receiver_exchanging", "message"]
