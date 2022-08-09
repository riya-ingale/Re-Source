from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from Institutes.models import *
from ResourceApp.models import Availability
from Institutes.serializers import *
from ResourceApp.serializers import *
import json
from django.http.response import JsonResponse

# Create your views here.

@csrf_exempt
def addlab(request):
    if request.method == "POST":
        # After filling all the details and submitting the form, Workforce id(one who is creating the lab) will be sent from frontend

        data = json.loads(request.body)
        workforce_id = data['workforce']
        workforce = WorkForce.objects.filter(id = workforce_id)[0]
        data['institute'] = workforce.institute.id
        if workforce.role_id in [3,4]:
            serializer = LabSerializer(data = data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(data={
                'status':200,
                'message':'SUCCESS',
                'data': serializer.data,
                'current_user':workforce_id,
                'role_id':workforce.role_id
            })
            else:
                return JsonResponse(data={
                'status':400,
                'message':'INVALID Data',
                'data': serializer.errors
            })
        else:
            return JsonResponse(data={
            'status':401,
            'message':'Role has no acess'
            })



