from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.utils.text import slugify
from django.db.models.signals import pre_save
from django.dispatch import receiver
import time


class StylusUserManager(BaseUserManager):
    def create_user(self, email, password=None, superuser=False):
        if not email:
            raise ValueError("User must have an email!")

        if not password:
            raise ValueError("User most have a password!")

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)

        if superuser:
            user.is_admin = True
            user.is_staff = True
            user.is_superuser = True

        user.save(using=self._db)

        return user

    def create_superuser(self):
        pass


class StylusUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField("Email", unique=True)

    USERNAME_FIELD = "email"

    username = models.CharField(max_length=200, blank=True, unique=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = StylusUserManager()

    def __str__(self):
        return self.email


@receiver(pre_save, sender=StylusUser)
def create_username(sender, instance, **kwargs):
    if not instance.username:
        username = slugify(instance.email.split("@")[0])

        if StylusUser.objects.filter(username=username).exists():
            username = f"{username}-{int(time.time())}"