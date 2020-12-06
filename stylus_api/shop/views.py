from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import ShopItem
from .serializers import PromotedSerializer


class PromotedView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        promoted_items = ShopItem.objects.filter(promoted=True)
        serializer = PromotedSerializer(promoted_items, many=True, context={"request": request})
        return Response(serializer.data)


class ShopItemList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response("This is the shop item list")