from ResourceApp.models import Transaction
from rest_framework import serializers
from Institutes.models import *


class ResourcesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resources
        fields = '__all__'
        # exclude = ['lab']
    

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

