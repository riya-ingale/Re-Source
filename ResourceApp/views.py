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
from datetime import datetime
import base64
import cv2
from django.core.paginator import Paginator
from django.views.decorators.http import require_http_methods

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


def converted(image):
    with open(image, "rb") as image_file:
        data = base64.b64encode(image_file.read())
    return data

@csrf_exempt
def getresources(request):
    if request.method == 'GET':
        # List of institutes,city to populate in the drop down along with their ids in asceding order of their name
        institutes = Institutes.objects.filter(role_id = 3).values_list('id','name','city').order_by('name').all()
        flag = 0
        try:
            data = json.loads(request.body)
            flag= 1
            if 'lab_id' in data:
                resourcesobjs = Resources.objects.filter(lab = int(data['lab_id']))
        except:
            resourcesobjs = Resources.objects.all()

        size = 2
        page = request.GET.get('page')
        paginator = Paginator(resourcesobjs, size)
        resources = paginator.get_page(page)
        serializer = ResourcesSerializer(resources, many=True)
        return_data = {
            'status':200,
            'message':"All Resources fetched",
            'total_count':paginator.count,
            'total_pages':paginator.num_pages,
            'data':serializer.data,
            'institutes':list(institutes)
        }
        if resources.number == paginator.num_pages:
            return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
        elif resources.number == 1:
            return_data['next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)
        else:
            return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
            return_data['next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)
        if flag:
            return_data['body_data'] = data
        return JsonResponse(return_data)

    # POST REQUEST FOR FILTER AND SEARCH 
    elif request.method == 'POST':
        institutes = Institutes.objects.filter(role_id = 3).values_list('id','name','city').order_by('name').all()
        bodyflag = 0
        # If searchtext is given then return searchtext, If one institute in the dropdown is given then return the institute id, if required date is given then return the date(type date)
        try:
            bodyflag = 1
            data = json.loads(request.body)

            if 'searchtext' in data and 'institute_id' in data and 'required_date' in data:
                search = data['searchtext']
                institute_id = data['institute_id']
                required_date = data['required_date']
                required_date = datetime.strptime(required_date, '%Y-%m-%d').date()
                if required_date<datetime.now().date():
                    return JsonResponse(data={
                        "message":"Invalid Date, Select a Valid Date",
                        "status": 400,
                    })
                labs = Labs.objects.filter(institute = institute_id).values_list('id').all()
                lab_ids = [item for sublist in list(labs) for item in sublist]
                resourcesobjs = Resources.objects.filter(name__icontains=search,lab__in = lab_ids).all()
                resultobjs = []
                for resourceobj in resourcesobjs:
                    lab = resourceobj.lab
                    start_time = int(lab.start_time)
                    end_time = int(lab.end_time)
                    slots = []
                    for i in range(start_time, end_time):
                        l = [i,i+1,resourceobj.quantity]
                        slots.append(l)
                    booked_slots = Book_slots.objects.filter(resource = resourceobj, date = required_date).values_list('start_time','end_time','units').all()
                    booked_slots = list(booked_slots)
                    result = []
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
                        if i[2]==0:
                            result.remove(i)
                    if result:
                        resultobjs.append(resourceobj)
                resourcesobjs = resultobjs
            elif "searchtext" in data and 'required_date' in data:
                search = data['searchtext']
                required_date = data['required_date']
                if required_date<datetime.now().date():
                    return JsonResponse(data={
                        "message":"Invalid Date, Select a Valid Date",
                        "status": 400,
                    })
                required_date = datetime.strptime(required_date, '%Y-%m-%d').date()
                resourcesobjs = Resources.objects.filter(name__icontains=search).all()
                resultobjs = []
                for resourceobj in resourcesobjs:
                    lab = resourceobj.lab
                    start_time = int(lab.start_time)
                    end_time = int(lab.end_time)
                    slots = []
                    for i in range(start_time, end_time):
                        l = [i,i+1,resourceobj.quantity]
                        slots.append(l)
                    booked_slots = Book_slots.objects.filter(resource = resourceobj, date = required_date).values_list('start_time','end_time','units').all()
                    booked_slots = list(booked_slots)
                    result = []
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
                        if i[2]==0:
                            result.remove(i)
                    if result:
                        resultobjs.append(resourceobj)
                resourcesobjs = resultobjs
            elif 'institute_id' in data and 'searchtext' in data:
                institute_id = data['institute_id']
                search = data['searchtext']
                labs = Labs.objects.filter(institute = institute_id).values_list('id').all()
                lab_ids = [item for sublist in list(labs) for item in sublist]
                resourcesobjs = Resources.objects.filter(name__icontains=search,lab__in = lab_ids).all()
            elif 'institute_id' in data and 'required_date' in data:
                institute_id = data['institute_id']
                required_date = data['required_date']
                if required_date<datetime.now().date():
                    return JsonResponse(data={
                        "message":"Invalid Date, Select a Valid Date",
                        "status": 400,
                    })
                required_date = datetime.strptime(required_date, '%Y-%m-%d').date()
                labs = Labs.objects.filter(institute = institute_id).values_list('id').all()
                lab_ids = [item for sublist in list(labs) for item in sublist]
                resourcesobjs = Resources.objects.filter(lab__in = lab_ids).all()
                resultobjs = []
                for resourceobj in resourcesobjs:
                    lab = resourceobj.lab
                    start_time = int(lab.start_time)
                    end_time = int(lab.end_time)
                    slots = []
                    for i in range(start_time, end_time):
                        l = [i,i+1,resourceobj.quantity]
                        slots.append(l)
                    booked_slots = Book_slots.objects.filter(resource = resourceobj, date = required_date).values_list('start_time','end_time','units').all()
                    booked_slots = list(booked_slots)
                    result = []
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
                        if i[2]==0:
                            result.remove(i)
                    if result:
                        resultobjs.append(resourceobj)
                resourcesobjs = resultobjs
            elif 'required_date' in data:
                required_date = data['required_date']
                required_date = datetime.strptime(required_date, '%Y-%m-%d').date()
                if required_date<datetime.now().date():
                    return JsonResponse(data={
                        "message":"Invalid Date, Select a Valid Date",
                        "status": 400,
                    })
                resourcesobjs = Resources.objects.all()
                resultobjs = []
                for resourceobj in resourcesobjs:
                    lab = resourceobj.lab
                    start_time = int(lab.start_time)
                    end_time = int(lab.end_time)
                    slots = []
                    for i in range(start_time, end_time):
                        l = [i,i+1,resourceobj.quantity]
                        slots.append(l)
                    booked_slots = Book_slots.objects.filter(resource = resourceobj, date = required_date).values_list('start_time','end_time','units').all()
                    booked_slots = list(booked_slots)
                    result = []
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
                        if i[2]==0:
                            result.remove(i)
                    if result:
                        resultobjs.append(resourceobj)
                    
                resourcesobjs = resultobjs
            elif "searchtext" in data:
                search = data['searchtext']
                resourcesobjs = Resources.objects.filter(name__icontains=search).all()
            elif "institute_id" in data:
                institute_id = data['institute_id']
                labs = Labs.objects.filter(institute = institute_id).values_list('id').all()
                lab_ids = [item for sublist in list(labs) for item in sublist]
                resourcesobjs = Resources.objects.filter(lab__in = lab_ids).all()
        except:
            resourcesobjs = Resources.objects.all()

        if len(resourcesobjs) == 0:
            return JsonResponse({
            'status':404,
            'message':"No such Resource Found",
        })
        else: 
            size = 2
            page = request.GET.get('page')
            paginator = Paginator(resourcesobjs, size)
            resources = paginator.get_page(page)
            serializer = ResourcesSerializer(resources, many=True)

            return_data = {
            'status':200,
            'message':"Resources Found",
            'total_count':paginator.count,
            'total_pages':paginator.num_pages,
            'data':serializer.data,
            'institutes':list(institutes)
            }
            if resources.number == paginator.num_pages and resources.number ==1:
                pass
            elif resources.number == paginator.num_pages:
                return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
            elif resources.number == 1:
                return_data['next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)
            else:
                return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
                return_data['next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)
            if bodyflag:
                return_data['body_data'] = data
            return JsonResponse(return_data)


def paster(imgs):
    leng = 0
    for img in imgs:
        # print(img[0])
        temp = cv2.imread(img[0])
        cv2.imwrite("./ReSource-FE/src/temp_images/temp"+str(leng+1)+".jpeg", temp)
        # file_name.append("../temp_images/temp"+str(leng+1)+"."+str(img[0].split('.')[-1]))
        leng+=1
    return

@csrf_exempt
def getdetails(request,r_id):
    print(type(r_id))
    if request.method == "GET":
        r_id = r_id
        resourceobj = Resources.objects.filter(id  =r_id)[0]
        serializer = ResourcesSerializer(resourceobj)

        imgs = Image.objects.filter(resource = resourceobj).values_list('image').all()
        # print(paster(imgs))
        paster(imgs)
        # print(p_img)
        return JsonResponse({
            'status':200,
            'message':"Resource fetched",
            'data':serializer.data,
            'images':len(imgs)
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
        required_quantity = int(data['quantity'])
    
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
        # image_b64 = []
        # for i in list(imgs):
        #     image_b64.append(converted(i[0]))
        # print(image_b64)
        imgs = list(imgs)
        print(imgs[0][0])
        # print(imgs[0][0])
        # print(result)
        # print(converted(imgs[0][0]))
        return JsonResponse({
            'status':200,
            'message':"Resource fetched",
            'data':serializer.data,
            'images':imgs,
            'available_slots':result  # SHOW THIS IN THE FRONTEND
        })

@csrf_exempt
def resource_edit(request,  id):
    if request.method == 'GET':
        data = json.loads(request.body)
        uid = data['user_id']
        role_id = data['Role']
        if role_id == 4:
            resource = Resources.objects.get(id = id)
            owner_id = resource.lab.workforce.id
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
            owner_id = resource.lab.institute.id
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
        data = json.loads(request.body)
        uid = data['user_id']
        role_id = data['Role']
        if role_id == 3:
            
            resource = Resources.objects.get(id = id)
            owner_id = resource.lab.institute.id
            if owner_id!=uid:
                return JsonResponse(data = {
                        'status': 401,
                        'message': 'It is not your lab you dont have access'
                    })
            del data['user_id']
            del data['Role']

            data['edit_approval'] = 0
            
            serializer = ResourcesSerializer(resource , data = data)
            if serializer.is_valid():
                serializer.save()
            return JsonResponse(data = {
                'status':200,
                'message': 'Resource Fetched',
                'resource_data' : serializer.data
            })
        elif role_id == 4:

            resource = Resources.objects.get(id = id)
            owner_id = resource.lab.workforce.id
            if owner_id!=uid:
                return JsonResponse(data = {
                        'status': 401,
                        'message': 'It is not your lab you dont have access'
                    })
            del data['id']
            del data['Role']

            data['edit_approval'] = 0

            serializer = ResourcesSerializer(resource , data = data)
            if serializer.is_valid():
                serializer.save()
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


@csrf_exempt
@require_http_methods(["POST"])
def addslots(request):
    if request.method == "POST":
        data = json.loads(request.body)
        # Eg. of request.body 
        # {
        #     "slots_overall":[[9,10],[11,12]],
        #     "required_quantity":10,
        #     "date":"2022/08/13"
        #     "resource_id":9,
        #     "workforce_id":1,
        # }
    
        workforce_id = data['workforce_id']
        workforce = WorkForce.objects.filter(id = workforce_id)[0]
        buyer_institute_id = workforce.institute.id
        slots = data['slots_overall']
        required_quantity = data['required_quantity']
        resource_id = data['resource_id']
        date = data['date']
        date = datetime.strptime(date, '%Y-%m-%d').date()
        resource = Resources.objects.filter(id = resource_id)[0]
        lab = resource.lab
        seller_institute_id = lab.institute_id

        for slot in slots:
            start_time = datetime.strptime(str(slot[0])+":00", "%H:%M").time()
            end_time = datetime.strptime(str(slot[1])+":00", "%H:%M").time()
            if resource.req_approval == 1:
                db = Cart(workforce = workforce, buyer_institute = buyer_institute_id, seller_institute = seller_institute_id,resource = resource, units = required_quantity,date = date, start_time  = start_time, end_time = end_time, cost = resource.cost, is_approved=0)
            else:
                db = Cart(workforce = workforce, buyer_institute = buyer_institute_id, seller_institute = seller_institute_id,resource = resource, units = required_quantity,date = date, start_time  = start_time, end_time = end_time, cost = resource.cost, is_approved=1)
            db.save()
        return JsonResponse(data = {
            "status":200,
            "message":"Slots sucessfully added to the cart",
        })
    



        