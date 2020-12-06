from rest_framework import serializers

from .models import ShopItem


class PromotedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopItem
        fields = [
            "promotion_image",
            "promotion_title"
        ]