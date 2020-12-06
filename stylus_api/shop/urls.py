from django.urls import path

from .views import PromotedView, ShopItemList

urlpatterns = [
    path('promoted/', PromotedView.as_view()),
    path('', ShopItemList.as_view()),
]