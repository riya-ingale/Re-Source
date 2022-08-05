from tkinter import CASCADE
from django.db import models

class Institutes(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 500)
    password = models.CharField(max_length = 100)
    university = models.CharField(max_length = 500)
    city = models.CharField(max_length = 100 , null = True)
    state = models.CharField(max_length = 500, null = True)
    pincode = models.IntegerField(null = True)
    email = models.CharField(max_length = 500)
    phone_no = models.IntegerField(null = True)
    role_id = models.IntegerField(default = 0)
    accredition = models.FileField(upload_to = 'media/accredition' , null = True)
    sop = models.FileField(upload_to='media/sop' , null = True)
    status = models.IntegerField(default=0) #-1,0,1


class WorkForce(models.Model):
    id = models.AutoField(primary_key=True)
    institute = models.ForeignKey(to = Institutes , on_delete=models.CASCADE)
    name = models.CharField(max_length = 500)
    position = models.CharField(max_length = 500)
    role_id = models.IntegerField()
    status = models.IntegerField(default = 0)
    password = models.CharField(max_length = 100)
    email_id = models.CharField(max_length = 500)
    phone_no = models.IntegerField()


class Labs(models.Model):
    id = models.AutoField(primary_key= True)
    workforce = models.ForeignKey(to = WorkForce , on_delete = models.SET_NULL, null=True)
    institute = models.ForeignKey(to = Institutes , on_delete=models.CASCADE)
    lab_staff = models.CharField(max_length = 500, default = str(id))
    resource_id = models.CharField(max_length = 500 , null = True)
    start_time = models.CharField(max_length = 500, null=True)
    end_time = models.CharField(max_length = 500, null=True)
    

class Resources(models.Model):
    id = models.AutoField(primary_key = True)
    lab = models.ForeignKey(to = Labs , on_delete=models.CASCADE)
    #institute = models.ForeignKey(to = Institutes , on_delete= models.CASCADE)
    name = models.CharField(max_length = 500)
    specification = models.CharField(max_length = 500)
    subject = models.CharField(max_length = 500)
    dimension = models.CharField(max_length = 500)
    details = models.CharField(max_length = 500)
    quantity = models.IntegerField(default = 1)
    cost = models.IntegerField()
    req_approval = models.IntegerField(default = 0)


class Image(models.Model):
    id = models.AutoField(primary_key=True)
    resource = models.ForeignKey(to = Resources , on_delete=models.CASCADE)
    image  = models.FileField(upload_to= 'media/resource_images')

class Role(models.Model):
    id = models.AutoField(primary_key = True)
    role = models.CharField(max_length = 500)

class Students(models.Model):
    id = models.AutoField(primary_key = True)
    password = models.CharField(max_length = 500)
    photo = models.FileField(upload_to = 'media/student_images')
    email = models.CharField(max_length = 500)

class Grievence(models.Model):
    id = models.AutoField(primary_key = True)
    resource = models.ForeignKey(to = Resources , on_delete = models.CASCADE)
    rating = models.FloatField()
    review = models.TextField()
    response = models.TextField(null = True)
    review_time = models.DateTimeField()
    response_time = models.DateTimeField(null = True)