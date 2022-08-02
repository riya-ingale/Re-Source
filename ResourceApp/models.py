from django.db import models
from Institutes.models import Resources
# Create your models here.

class Availability(models.Model):
    a_id = models.AutoField(primary_key=True)
    resource = models.ForeignKey(to = Resources, on_delete = models.CASCADE )
    lab = models.IntegerField()
    available_units = models.IntegerField()
    day = models.TextField()
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    approved = models.IntegerField(default = 0)