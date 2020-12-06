from django.db import models
from django.utils.text import slugify

from users.models import StylusUser


def image_dir_path(instance, filename):
    return f"shop/{slugify(instance.category.name)}/{slugify(instance.title)}/{filename}"


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


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
    discount_price = models.IntegerField(null=True, blank=True)

    in_stock = models.IntegerField(default=1)

    # details
    short_description = models.TextField(max_length=1000, blank=True)
    description = models.TextField(max_length=5000, blank=True)
    image1 = models.ImageField(upload_to=image_dir_path, blank=True)
    image2 = models.ImageField(upload_to=image_dir_path, blank=True)
    image3 = models.ImageField(upload_to=image_dir_path, blank=True)

    def __str__(self):
        return self.title


class OrderItem(models.Model):
    item = models.ForeignKey(ShopItem, on_delete=models.CASCADE, related_name="orders")
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.item.title}: {self.quantity}"


class Order(models.Model):
    user = models.ForeignKey(StylusUser, on_delete=models.CASCADE, related_name="orders", blank=True, null=True)
    items = models.ManyToManyField(OrderItem)

    # address
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField("Email")
    phone = models.CharField(max_length=200)

    # webshop data fields
    zipcode = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    address = models.CharField(max_length=200)

    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
