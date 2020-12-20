from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import ShopItem, Category
from .serializers import PromotedSerializer, ShopItemCardSerializer
from django.conf import settings

import stripe
stripe.api_key = settings.STRIPE_API_KEY

from shop.models import OrderItem, Order, ShopItem


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


class OrderView(APIView):
    permission_classes = [AllowAny]
    customer = None
    shopping_list = []

    def post(self, request):
        payment_id = request.data.get("payment_id")
        amount = request.data.get("amount")
        shopping_list = request.data.get("shopping_list")
        customer = request.data.get("customer")

        # payment_intent = stripe.PaymentIntent.create(
        #     amount=amount,
        #     currency='huf',
        #     payment_method=payment_id,
        #     receipt_email=customer["email"],
        #     confirm=True
        # )

        payment_intent = {
            "status": "succeeded"
        }

        if payment_intent.get("status") == "succeeded":
            self.customer = customer
            self.shopping_list = shopping_list
            self._save_order()

        return Response(payment_intent)

    def _save_order(self):
        order_items = []

        for item in self.shopping_list:
            item_id = item["id"]
            quantity = item["quantity"]

            shop_item = ShopItem.objects.get(id=item_id)
            shop_item.in_stock -= quantity
            shop_item.save()

            order_item = OrderItem.objects.create(
                item=shop_item,
                quantity=quantity
            )

            order_items.append(order_item)

        order = Order.objects.create(
            first_name=self.customer["first_name"],
            last_name=self.customer["last_name"],
            email=self.customer["email"],
            phone=self.customer["phone"],
            zipcode=self.customer["zipcode"],
            city=self.customer["city"],
            address=self.customer["address"],
        )

        order.items.set(order_items)
        order.save()