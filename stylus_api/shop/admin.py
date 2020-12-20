from django.contrib import admin

from .models import ShopItem, Category, Order, OrderItem


class ShopItemAdmin(admin.ModelAdmin):
    list_display = ["title", "in_stock", "promoted", "price", "discount_price"]
    list_editable = ["promoted", "in_stock", "price", "discount_price"]


class OrderAdmin(admin.ModelAdmin):
    list_display = ["user", "email", "phone"]


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["item", "quantity"]


admin.site.register(ShopItem, ShopItemAdmin)
admin.site.register(Category)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
