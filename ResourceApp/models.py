from time import timezone
from django.db import models
from Institutes.models import *
from django.utils import timezone


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
    workforce = models.ForeignKey(to = WorkForce , on_delete=models.CASCADE , null = True)
    buyer_institute = models.IntegerField()
    seller_institute = models.IntegerField()
    resource = models.ForeignKey(to = Resources, on_delete = models.CASCADE)
    units = models.IntegerField(default = 1)
    add_date = models.DateTimeField(auto_now=True)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    cost =  models.IntegerField()
    is_approved = models.IntegerField(default = 1) # 1 for approved, 0 for pending, -1 for rejected, 2 for made an order
    visitor = models.FileField(null = True)

class ProductInOrder(models.Model):
    id = models.AutoField(primary_key = True)
    order_id = models.IntegerField(null = True)
    workforce = models.ForeignKey(to = WorkForce , on_delete=models.DO_NOTHING , null = True)
    buyer_institute = models.IntegerField()
    seller_institute = models.IntegerField()
    resource = models.ForeignKey(to = Resources, on_delete = models.DO_NOTHING)
    units = models.IntegerField(default = 1)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    cost =  models.FloatField()
    visitor = models.FileField(null = True)


class Order(models.Model):
    payment_status_choices = (
        (1, 'SUCCESS'),
        (-1, 'FAILURE' ),
        (0, 'PENDING'),
    )
    id = models.AutoField(primary_key = True)
    workforce = models.ForeignKey(to = WorkForce, on_delete = models.DO_NOTHING)
    institute = models.ForeignKey(to = Institutes, on_delete= models.DO_NOTHING)
    # order_items = models.ManyToManyField(ProductInOrder)
    finalcost = models.FloatField(null = True)
    datetime_of_payment = models.DateTimeField(default=timezone.now)
    request_status = models.IntegerField(default = 0)
    payment_status = models.IntegerField(choices = payment_status_choices, default=0)
    # related to razorpay
    razorpay_order_id = models.CharField(max_length=500, null=True, blank=True)
    razorpay_payment_id = models.CharField(max_length=500, null=True, blank=True)
    razorpay_signature = models.CharField(max_length=500, null=True, blank=True)


class Transaction(models.Model):
    id = models.AutoField(primary_key=  True)
    order  = models.ForeignKey(to = Order , on_delete= models.DO_NOTHING , null = True)
    tid = models.CharField(max_length = 500, null = True)
    buyer = models.CharField(max_length = 500, null = True)
    seller = models.ForeignKey(to = Institutes , on_delete= models.DO_NOTHING)
    # order_items = models.ManyToManyField(ProductInOrder)
    finalcost = models.FloatField(null = True)
    is_paid = models.IntegerField(default = 0)

# #Handling Bills charfield

# class Bill_slots(models.Model):
#     id = models.AutoField(primary_key = True)
#     start_time = models.TimeField()
#     end_time   = models.TimeField()
#     resource = models.ForeignKey(to=Resources , on_delete=models.DO_NOTHING)
#     date = models.DateField()

#     cost = models.FloatField()


# seller = {'Mumbai_university':{id : [ProductInOrder , ] , cost :[500 , ]}}

# for key , value in seller:
#     create Transaction
#     order = 
#     tid   = []
#     buyer = buyer got ite
#     seller = key
#     order_items = ProductInOrder
#     cost = sum() * 1.02








