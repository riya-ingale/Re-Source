from django.shortcuts import render, HttpResponse
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from Institutes.models import *
from ResourceApp.models import *
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

@csrf_exempt
def addresources(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        return JsonResponse(data={
            'Resourcename': data['name']
        })
    elif request.method == 'GET':
        return HttpResponse('FORM TO ADD A RESOURCE')


def getresources(request):
    if request.method == 'GET':
        resources = Resources.objects.all()
        return HttpResponse("GET ALL RESOURCES")