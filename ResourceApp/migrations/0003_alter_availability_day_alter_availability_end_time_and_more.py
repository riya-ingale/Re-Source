# Generated by Django 4.0.6 on 2022-08-09 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ResourceApp', '0002_bill_cart'),
    ]

    operations = [
        migrations.AlterField(
            model_name='availability',
            name='day',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='availability',
            name='end_time',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='availability',
            name='lab',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='availability',
            name='start_time',
            field=models.IntegerField(),
        ),
    ]
