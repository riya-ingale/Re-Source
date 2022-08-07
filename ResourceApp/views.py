from django.shortcuts import render, HttpResponse
from ResourceApp.serializers import ResourcesSerializer
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from Institutes.models import *
from ResourceApp.models import *
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

@csrf_exempt
def addresources(request,lab_id):
    if request.method == "POST":
        data = json.loads(request.body)
        data['lab'] = lab_id
        print(data)
        serializer = ResourcesSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(data={
            'message':'SUCCESS',
            'data': serializer.data
        })
        else:
            print("serializer.data not valid") 
            return JsonResponse(data={
            'message':'INVALID',
            'data': serializer.errors
        })  
    elif request.method == 'GET':
        return HttpResponse('FORM TO ADD A RESOURCE')


def getresources(request):
    if request.method == 'GET':
        resources_objs = Resources.objects.all()
        serializer = ResourcesSerializer(resources_objs,many = True)
        return JsonResponse({
            'status':True,
            'message':"All Resources fetched",
            'data':serializer.data,
        })


