from rest_framework import serializers
from Institutes.models import *


class InstituteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institutes
        fields = '__all__'