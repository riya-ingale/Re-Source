from re import T
import resource
from django.db import models
from Institutes.models import *
# Create your models here.

class Book_slots(models.Model):
    a_id = models.AutoField(primary_key=True)
    resource = models.ForeignKey(to = Resources, on_delete = models.CASCADE )
    lab = models.IntegerField(null = True)
    units = models.IntegerField()
    day = models.TextField(null = True)
    date = models.DateField()
    start_time = models.IntegerField()
    end_time = models.IntegerField()
    approved = models.IntegerField(default = 0)

class Cart(models.Model):
    c_id = models.AutoField(primary_key = True)
    buyer_institute = models.IntegerField()
    seller_institute = models.IntegerField()
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
    buyer_institute = models.IntegerField()'
    seller_institute = models.CharField(max_length = 500)
    resource = models.CharField(max_length = 500)
    units = models.CharField(max_length = 500)
    dates = models.CharField(max_length = 500)
    start_time = models.CharField(max_length = 500)
    end_time = models.CharField(max_length = 500)
    labs = models.CharField(max_length = 500)
    cost = models.FloatField()


class Transaction(models.Model):
    id = models.AutoField(primary_key=  True)
    tid = models.TextField()
    buyer_institute = models.ForeignKey(to = Institutes , on_delete = models.DO_NOTHING, null=True)
    seller_institute = models.ForeignKey(to = Institutes , on_delete = models.SET_NULL, null=True)
    resource = models.IntegerField()
    transaction_date = models.DateField(auto_now=True)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    cost = models.IntegerField()
    units = models.IntegerField()
    status = models.IntegerField(default = 0)




