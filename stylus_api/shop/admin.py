from django.contrib import admin

from .models import ShopItem, Category, Order, OrderItem

admin.site.register(ShopItem)
admin.site.register(Category)
admin.site.register(Order)
admin.site.register(OrderItem)
