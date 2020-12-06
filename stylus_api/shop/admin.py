from django.contrib import admin

from .models import ShopItem, Category, Order, OrderItem


class ShopItemAdmin(admin.ModelAdmin):
    list_display = ["title", "in_stock", "promoted", "price", "discount_price"]
    list_editable = ["promoted", "price", "discount_price"]


admin.site.register(ShopItem, ShopItemAdmin)
admin.site.register(Category)
admin.site.register(Order)
admin.site.register(OrderItem)
