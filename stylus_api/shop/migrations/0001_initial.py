# Generated by Django 3.1.4 on 2020-12-06 13:25

from django.db import migrations, models
import django.db.models.deletion
import shop.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='ShopItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('promotion_image', models.ImageField(blank=True, upload_to=shop.models.image_dir_path)),
                ('promotion_title', models.CharField(blank=True, max_length=200)),
                ('promoted', models.BooleanField(default=False)),
                ('card_image', models.ImageField(upload_to=shop.models.image_dir_path)),
                ('card_title', models.CharField(blank=True, max_length=200)),
                ('price', models.IntegerField()),
                ('discount_price', models.IntegerField()),
                ('in_stock', models.IntegerField(default=1)),
                ('short_description', models.TextField(blank=True, max_length=1000)),
                ('description', models.TextField(blank=True, max_length=5000)),
                ('image1', models.ImageField(blank=True, upload_to=shop.models.image_dir_path)),
                ('image2', models.ImageField(blank=True, upload_to=shop.models.image_dir_path)),
                ('image3', models.ImageField(blank=True, upload_to=shop.models.image_dir_path)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category', to='shop.category')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='shop.shopitem')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('phone', models.CharField(max_length=200)),
                ('zipcode', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('items', models.ManyToManyField(to='shop.OrderItem')),
            ],
        ),
    ]
