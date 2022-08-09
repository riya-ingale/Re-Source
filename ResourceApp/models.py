from django.db import models
from Institutes.models import Resources
# Create your models here.

class Availability(models.Model):
    a_id = models.AutoField(primary_key=True)
    resource = models.ForeignKey(to = Resources, on_delete = models.CASCADE )
    lab = models.IntegerField(null = True)
    available_units = models.IntegerField()
    day = models.TextField(null = True)
    date = models.DateField()
    start_time = models.IntegerField()
    end_time = models.IntegerField()
    approved = models.IntegerField(default = 0)

class Cart(models.Model):
    c_id = models.AutoField(primary_key = True)
    user = models.IntegerField()
    resource = models.ForeignKey(to = Resources, on_delete = models.CASCADE)
    units = models.IntegerField(default = 1)
    add_date = models.DateTimeField(auto_now=True)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    cost =  models.FloatField()
    is_approved = models.IntegerField(default = 0)

class Bill(models.Model):
    id = models.AutoField(primary_key = True)
    resource = models.CharField(max_length = 500)
    units = models.CharField(max_length = 500)
    dates = models.CharField(max_length = 500)
    start_time = models.CharField(max_length = 500)
    end_time = models.CharField(max_length = 500)
    labs = models.CharField(max_length = 500)
    cost = models.FloatField()