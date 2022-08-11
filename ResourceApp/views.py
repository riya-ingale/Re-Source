from ResourceApp.serializers import ResourcesSerializer
from django.http.response import JsonResponse
from Institutes.models import *
from ResourceApp.models import *
from django.views.decorators.csrf import csrf_exempt
import json
import base64
from django.core.files.base import ContentFile
import string
import random
from datetime import date, timedelta, datetime


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

        # List of institutes,city to populate in the drop down along with their ids in asceding order of their name
        institutes = Institutes.objects.filter(role_id = 3).values_list('id','name','city').order_by('name').all()

        return JsonResponse({
            'status':200,
            'message':"All Resources fetched",
            'data':serializer.data,
            'institutes':list(institutes)
        })
    elif request.method == 'POST':

        data = json.loads(request.body)

        # If searchtext is given then return searchtext, If one institute in the dropdown is given then return the institute id 

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

        imgs = Image.objects.filter(resource = resourceobj).values_list('image').all()

        return JsonResponse({
            'status':200,
            'message':"Resource fetched",
            'data':serializer.data,
            'images':list(imgs)
        })

    # After sending date and units required this POST will show the slots along with resource data  
    elif request.method == "POST":
        resourceobj = Resources.objects.filter(id  = r_id)[0]
        serializer = ResourcesSerializer(resourceobj)

        imgs = Image.objects.filter(resource = resourceobj).values_list('image').all()

        data = json.loads(request.body)
        date = data['date'] 
        print(date)
        required_date = datetime.strptime(date, '%Y-%m-%d').date()
        print(type(date), date) # type = date
        required_quantity = data['quantity']
    
        if required_quantity<=resourceobj.quantity:
            lab = resourceobj.lab
            start_time = int(lab.start_time)
            end_time = int(lab.end_time)
            slots = []
            for i in range(start_time, end_time):
                l = [i,i+1,resourceobj.quantity]
                slots.append(l)
            booked_slots = Book_slots.objects.filter(resource = resourceobj, date = required_date).values_list('start_time','end_time','units').all()
            og_booked_slots = list(booked_slots)
            booked_slots = og_booked_slots.copy()
            result=[]
            for i in slots:
                flag = 0
                for j in booked_slots:
                    if i[0] == j[0] and i[1] == j[1]:
                        l = [i[0],j[1],i[2]-j[2]]
                        result.append(l)
                        booked_slots.remove(j)
                        flag = 1
                        break
                if not flag:   
                    result.append(i)
            for i in result:
                if not i[2]>=required_quantity:
                    result.remove(i)
        else:
            return JsonResponse({
            'status':404,
            'message':f"{required_quantity} Units not available, Try a lesser number"
        })
        return JsonResponse({
            'status':200,
            'message':"Resource fetched",
            'data':serializer.data,
            'images':list(imgs),
            'available_slots':result  # SHOW THIS IN THE FRONTEND
        })

@csrf_exempt
def resource_edit(request,  id):
    data = json.loads(request.body())
    uid = data['id']
    role_id = data['Role']
    if request.method == 'GET':
        if role_id == 4:
            resource = Resources.objects.get(id = id)
            owner_id = resource.lab.workforce
            if owner_id != uid:
                return JsonResponse(data = {
                        'status': 401,
                        'message': 'Only lab owner has access'
                    })
            serializer = ResourcesSerializer(resource)
            return JsonResponse(data = {
                'status':200,
                'message': 'Resource Fetched',
                'resource_data' : serializer.data
            })
        elif role_id == 3:
            resource = Resources.objects.get(id = id)
            owner_id = resource.lab.institute
            if owner_id != uid:
                return JsonResponse(data = {
                        'status': 401,
                        'message': 'It is not you lab you dont have access'
                    })
            serializer = ResourcesSerializer(resource)
            return JsonResponse(data = {
                'status':200,
                'message': 'Resource Fetched',
                'resource_data' : serializer.data
            })
        else:
            return JsonResponse(data = {
                'status': 401,
                'message': 'This role donot have access'
            })
    
    else:
        if role_id == 3:

            resource = Resources.objects.get(id = id)
            owner_id = resource.lab.institute
            if owner_id!=uid:
                return JsonResponse(data = {
                        'status': 401,
                        'message': 'It is not you lab you dont have access'
                    })
            del data['id']
            del data['Role']

            serializer = ResourcesSerializer(resource , data == data)
            return JsonResponse(data = {
                'status':200,
                'message': 'Resource Fetched',
                'resource_data' : serializer.data
            })
        elif role_id == 4:

            resource = Resources.objects.get(id = id)
            owner_id = resource.lab.workforce
            if owner_id!=uid:
                return JsonResponse(data = {
                        'status': 401,
                        'message': 'It is not you lab you dont have access'
                    })
            del data['id']
            del data['Role']

            data['edit_approval'] = 0

            serializer = ResourcesSerializer(resource , data == data)
            return JsonResponse(data = {
                'status':200,
                'message': 'Resource Fetched',
                'resource_data' : serializer.data
            })

        else:
            return JsonResponse(data = {
                'status': 401,
                'message': 'This role donot have access'
            })
