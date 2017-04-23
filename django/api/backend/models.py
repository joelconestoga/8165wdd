from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    user = models.ForeignKey(User, default=1)
    name = models.CharField(max_length=100)
    value = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(Category, default=1)

    def __str__(self):
        return self.name + ' - ' + str(self.value)


class UserSession(models.Model):
    user = models.ForeignKey(User, default=1)
    logged_in = models.DateTimeField(default=timezone.now, blank=True)
    expiration = models.DateTimeField()


