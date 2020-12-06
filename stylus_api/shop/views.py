from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import ShopItem, Category
from .serializers import PromotedSerializer, ShopItemCardSerializer


class PromotedView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        promoted_items = ShopItem.objects.filter(promoted=True)
        serializer = PromotedSerializer(promoted_items, many=True, context={"request": request})
        return Response(serializer.data)


class CategoriesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(
            [{"id": i.pk, "name": i.name} for i in Category.objects.all()]
        )


class ShopItemList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        shop_items = ShopItem.objects.all()
        serializer = ShopItemCardSerializer(shop_items, many=True, context={"request": request})
        return Response(serializer.data)