from rest_framework import serializers

from .models import ShopItem


class PromotedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopItem
        fields = [
            "promotion_image",
            "promotion_title"
        ]


class ShopItemCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopItem
        fields = [
            "id",
            "title",
            "short_description",
            "card_image",
            "card_title",
            "price",
            "discount_price",
            "in_stock",
        ]