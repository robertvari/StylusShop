from django.db import models
from django.utils.text import slugify


def image_dir_path(instance, filename):
    return f"shop/{instance.category.name}/{slugify(instance.title)}/{filename}"


class Category(models.Model):
    name = models.CharField(max_length=200)


class ShopItem(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category")
    title = models.CharField(max_length=200)

    # promotion card
    promotion_image = models.ImageField(upload_to=image_dir_path, blank=True)
    promotion_title = models.CharField(max_length=200, blank=True)
    promoted = models.BooleanField(default=False)

    # shop item card
    card_image = models.ImageField(upload_to=image_dir_path)
    card_title = models.CharField(max_length=200, blank=True)
    price = models.IntegerField()
    discount_price = models.IntegerField()

    in_stock = models.BooleanField(default=True)

    # details
    description = models.TextField(max_length=5000, blank=True)
    image1 = models.ImageField(upload_to=image_dir_path, blank=True)
    image2 = models.ImageField(upload_to=image_dir_path, blank=True)
    image3 = models.ImageField(upload_to=image_dir_path, blank=True)