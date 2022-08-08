from django.shortcuts import render, HttpResponse
from ResourceApp.serializers import ResourcesSerializer
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from Institutes.models import *
from ResourceApp.models import *
from django.views.decorators.csrf import csrf_exempt
import json
from sqlalchemy import or_

# Create your views here.

@csrf_exempt
def addresources(request,username):
    if request.method == "POST":
        print(json.loads(request.body),username)
        # if role in []
        return JsonResponse({'status':200,'username':username})
        #cost and quantity int
        # t = Students.objects.get(email = username)
        # data = json.loads(request.body)
        # data['lab'] = t['id']
        # print(data)
        # serializer = ResourcesSerializer(data = data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return JsonResponse(data={
        #     'message':'SUCCESS',
        #     'data': serializer.data
        # })
        # else:
        #     print("serializer.data not valid") 
        #     return JsonResponse(data={
        #     'message':'INVALID',
        #     'data': serializer.errors
        # })  
    # elif request.method == 'GET':
    #     return HttpResponse('FORM TO ADD A RESOURCE')

@csrf_exempt
def getresources(request):
    if request.method == 'GET':
        resourcesobjs = Resources.objects.all()
        serializer = ResourcesSerializer(resourcesobjs,many = True)
        return JsonResponse({
            'status':200,
            'message':"All Resources fetched",
            'data':serializer.data,
        })
    elif request.method == 'POST':
        data = json.loads(request.body)
        search = data['searchtext']
        resourcesobjs = Resources.objects.filter(name__contains=search).all()
        print("Resources",resourcesobjs)
        if len(resourcesobjs) == 0:
            return JsonResponse({
            'status':404,
            'message':"No such Resource Found",
        })
        else: 
            serializer = ResourcesSerializer(resourcesobjs,many = True)
            return JsonResponse({
                'status':200,
                'message':"Resources Found",
                'count': len(resourcesobjs),
                'data':serializer.data,
            })
