from django.db import models



from Institutes.models import WorkForce, Resources

# Create your models here.

class UserPlan(models.Model):
    id = models.AutoField(primary_key=True)
    order_id = models.IntegerField()
    plan_id = models.IntegerField() # 1 for monthly, 2 for 3 months and 3 for 6 months
    is_active = models.BooleanField()
    start_date = models.DateField(null = True)
    end_date = models.DateField(null = True)
    resource_id = models.ForeignKey(to = Resources, on_delete=models.DO_NOTHING)
    user_id = models.ForeignKey(to = WorkForce , on_delete = models.DO_NOTHING)
    cost = models.FloatField()