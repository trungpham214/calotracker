from django.db import models
from datetime import datetime

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    calo = models.IntegerField(null=True, blank=True)
    carb = models.IntegerField(null=True, blank=True)
    fat = models.IntegerField(null=True, blank=True)
    protein = models.IntegerField(null=True, blank=True)

class Meal(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.CharField(max_length=100, blank=True)
    date = models.DateField(default=datetime.now)
    type = models.CharField(max_length=100, blank=True)
    calo = models.IntegerField(null=True, blank=True)
    carb = models.IntegerField(null=True, blank=True)
    fat = models.IntegerField(null=True, blank=True)
    protein = models.IntegerField(null=True, blank=True)
