from django.shortcuts import render, HttpResponse
from ResourceApp.serializers import ResourcesSerializer
from Institutes.serializers import InstituteSerializer
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
from datetime import date, timedelta, datetime




# Create your views here.

def add_available_slots(res):
    lab = Labs.objects.filter(id = res.lab_id)[0]
    today = date.today()
    start_time = int(lab.start_time)
    end_time = int(lab.end_time)
    slots = []
    for k in range(7):
        for i in range(start_time, end_time):
            db = Availability(resource = res,lab = lab.id, available_units = res.quantity, date = today, start_time = i, end_time = i+1)
            db.save()
        today = today + timedelta(days=1)
    return slots

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

                    res = Resources.objects.filter(name = data['name'],lab = lab_id,cost= data['cost'],quantity = data['quantity'])[0]
                    db = Image(resource = res,image = imagedata)
                    db.save()
                # add_available_slots(res)
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

        # List of institutes to populate in the drop down along with their ids
        institutes = Institutes.objects.values_list('id','name').all()

        return JsonResponse({
            'status':200,
            'message':"All Resources fetched",
            'data':serializer.data,
            'institutes':list(institutes)
        })
    elif request.method == 'POST':
        data = json.loads(request.body)

        if 'searchtext' in data and 'institute_id' in data:
            search = data['searchtext']
            institute_id = data['institute_id']
            labs = Labs.objects.filter(institute = institute_id).values_list('id').all()
            lab_ids = [item for sublist in list(labs) for item in sublist]
            resourcesobjs = Resources.objects.filter(name__icontains=search,lab__in = lab_ids).all()
        elif "searchtext" in data:
            search = data['searchtext']
            resourcesobjs = Resources.objects.filter(name__icontains=search).all()
        elif 'institute_id' in data:
            institute_id = data['institute_id']
            labs = Labs.objects.filter(institute = institute_id).values_list('id').all()
            lab_ids = [item for sublist in list(labs) for item in sublist]
            resourcesobjs = Resources.objects.filter(lab__in = lab_ids).all()


        # Availabilty on that Date To be Done
        
        
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

@csrf_exempt
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
    elif request.method == "POST":
        resourceobj = Resources.objects.filter(id  =r_id)[0]
        serializer = ResourcesSerializer(resourceobj)

        data = json.loads(request.body)
        date = data['date'] 
        print(date)
        date = datetime.strptime(date, '%Y-%m-%d').date()
        print(type(date), date)# type = date
        quantity = data['quantity']
        slots = Availability.objects.filter(date= date, available_units__gte=quantity, resource_id = r_id ).all()
        result =[]
        for slot in slots:
            tup = (slot.start_time,slot.end_time)
            result.append(tup)

        return JsonResponse({
            'status':200,
            'message':"Resource fetched",
            'data':serializer.data,
            'slots':result
        })



# def addslots(request):
#     data = json.loads(request.body)
#     res = Resources.objects.filter(id = data['res_id'])[0]
#     slots = add_available_slots(res)
#     print(slots)
#     return JsonResponse(data={
#         "slots":slots
#     })