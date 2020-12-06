from django.urls import path

from .views import PromotedView, ShopItemList, CategoriesView

urlpatterns = [
    path('promoted/', PromotedView.as_view()),
    path('categories/', CategoriesView.as_view()),
    path('', ShopItemList.as_view()),
]