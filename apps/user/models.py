from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager as AuthUserManager
from django.db import models

from todo.ext.soft_delete import SoftDeleteModel, SoftDeleteManager


class UserManager(SoftDeleteManager, AuthUserManager):
    pass


class User(SoftDeleteModel, AbstractUser):
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    date_joined = None
    objects = UserManager()

    @property
    def display_name(self):
        return self.get_full_name() or self.username

    def __str__(self):
        return self.display_name
