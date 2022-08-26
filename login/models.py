from django.db import models

# Create your models here.
class Anomaly(models.Model):
    id = models.AutoField(primary_key=True)
    ip = models.GenericIPAddressField()
