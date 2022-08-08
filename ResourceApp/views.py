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
import base64
from django.core.files.base import ContentFile
import string
import random

# Create your views here.

@csrf_exempt
def addresources(request,username,lab_id):
    if request.method == "POST":
        data = json.loads(request.body)
        role_id = data['role_id']
        if role_id in [3,4]:
            t = Labs.objects.get(id = lab_id)
            data['lab'] = t.id
            serializer = ResourcesSerializer(data = data)
            if serializer.is_valid():
                serializer.save()
                images = data['img']
                for image_data in images:
                    format, imgstr = image_data.split(';base64,')
                    ext = format.split('/')[-1]
                    photoname = ''.join(random.choices(string.ascii_uppercase +string.digits, k=10))
                    file_name = photoname+"." + ext
                    imagedata = ContentFile(base64.b64decode(imgstr),name=file_name)

                    res = Resources.objects.filter(name = data['name'],lab = lab_id,cost= data['cost'])[0]
                    db = Image(resource = res,image = imagedata)
                    db.save()
                print("got the images")
                return JsonResponse(data={
                'status':200,
                'message':'SUCCESS',
                'data': serializer.data,
                'username':username,
                'role_id':role_id
            })
            else:
                print("serializer.data not valid") 
                return JsonResponse(data={
                'status':400,
                'message':'INVALID Data',
                'data': serializer.errors
            })
        else:
            print("Role has no acess") 
            return JsonResponse(data={
            'status':401,
            'message':'Role has no acess'
            })


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


def getdetails(request,r_id):
    if request.method == "GET":
        r_id = r_id
        resourceobj = Resources.objects.filter(id  =r_id)[0]
        serializer = ResourcesSerializer(resourceobj)

        # Availability and Slots to be added

        return JsonResponse({
            'status':200,
            'message':"Resource fetched",
            'data':serializer.data
        })
