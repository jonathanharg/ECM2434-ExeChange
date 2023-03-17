from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import ClothingItem, Trade


class MinimalUserSerializer(serializers.ModelSerializer):
    # item_ratio = serializers.ReadOnlyField()
    class Meta:
        model = get_user_model()
        fields = ["id", "username"]


class ClothingItemSerializer(serializers.ModelSerializer):
    owner = MinimalUserSerializer()

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


# TODO: Minimize this so only the needed data is sent
class MinimalTradeClothingItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothingItem
        depth = 1
        fields = [
            "id",
            "caption",
            "image",
        ]


# TODO: Update
class TradeSerializer(serializers.ModelSerializer):
    giver = MinimalUserSerializer()
    receiver = MinimalUserSerializer()
    giver_giving = MinimalTradeClothingItemSerializer(many=True)
    receiver_exchanging = MinimalTradeClothingItemSerializer(many=True)

    class Meta:
        model = Trade
        depth = 1
        fields = [
            "id",
            "status",
            "giver",
            "receiver",
            "giver_giving",
            "receiver_exchanging",
            "message",
            "location",
            "time",
        ]
