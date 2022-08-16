from rest_framework import serializers
from Institutes.models import *


class InstituteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institutes
        fields = '__all__'

class WorkForceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkForce
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'


class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labs
        fields = '__all__'

