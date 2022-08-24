from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from Institutes.models import *
from ResourceApp.models import *
from Institutes.serializers import *
from ResourceApp.serializers import *
import json
from django.http.response import JsonResponse
from datetime import datetime
from django.core.paginator import Paginator
import cv2
from ReSource.utils import Check

# Create your views here.
@csrf_exempt
def addlab(request):
    try:
        token = request.headers['Authorization']
    except:
        return JsonResponse(data= {
            "message":"Unauthorized Access, Please Login",
            "status":401
        })
    info = Check.check_auth(token)
    if info['status'] == 0:
        return JsonResponse(data= {
            "message":"Unauthorized Access, Please Login",
            "status":401
        })
    role_id = info['role_id']
    user_id = info['user_id']

    if request.method == "POST":
        # After filling all the details and submitting the form, Workforceid(one who is creating the lab) will be sent from frontend along with form details

        # Eg. {
        #     "user_id":1,
        #     "name":"Biology Lab",
        #     "start_time":"01:00",
        #     "end_time":"18:00"
        # }

        data = json.loads(request.body)
        print(data)
        # workforce_id = data['user_id']
        data["workforce"] = user_id

        # considering start_time and end_time were taken from time input field, 24hr clock
        data['start_time'] = data['start_time'][:2]
        data['end_time'] = data['end_time'][:2]
        workforce = WorkForce.objects.filter(id = user_id)[0]
        data['institute'] = workforce.institute.id
        
        if workforce.role_id == 4: # only Lab Assistant can add labs
            serializer = LabSerializer(data = data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(data={
                'status':200,
                'message':'SUCCESS',
                'data': serializer.data,
                'current_user':user_id,
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


## for post route of csrf send role and userid as well for authentication           
@csrf_exempt
def edit_lab(request,lab_id):
    try:
        token = request.headers['Authorization']
    except:
        return JsonResponse(data= {
            "message":"Unauthorized Access, Please Login",
            "status":401
        })
    info = Check.check_auth(token)
    if info['status'] == 0:
        return JsonResponse(data= {
            "message":"Unauthorized Access, Please Login",
            "status":401
        })
    role_id = info['role_id']
    user_id = info['user_id']

    if request.method == 'GET':
        user = WorkForce.objects.filter(id = user_id)[0]
        if user.role_id == 4:
            lab = Labs.objects.get(id = lab_id)
            lab_data = []
            serializer = LabSerializer(lab)
            lab_data = serializer.data.copy()

            start_time  = lab_data['start_time']+":00"
            lab_data['start_time'] = datetime.strptime(start_time, '%H:%M').time()
            end_time  = lab_data['end_time']+":00"
            lab_data['end_time'] = datetime.strptime(end_time, '%H:%M').time()

            lab_data['institute_name'] = Institutes.objects.filter(id = int(lab_data['institute']))[0].name

            if lab.workforce.id != int(user_id):
                return JsonResponse(data = {
                    'status': 401,
                    'message': 'Only lab owner has access',
                    "user_id":user_id,
                    "lab_id":lab_id,
                    "lab.workforce.id":lab.workforce.id
                })
            else:
                return JsonResponse(data = {
                    'status':200,
                    'message':'Lab Data fetched',
                    'data': lab_data
                })
        else:
            return JsonResponse(data = {
                    'status':401,
                    'message':'This role has no access'
                })
        # elif role_id == 3:       
        #     user = Institutes.objects.filter(id = user_id)[0]
        #     lab = Labs.objects.get(id = lab_id)
        #     serializer = LabSerializer(lab)
        #     if lab.institute.id != user_id:
        #         return JsonResponse(data = {
        #             'status': 401,
        #             'message': 'Only lab owner has access'
        #         })
        #     else:
                
        #         return JsonResponse(data = {
        #             'status':200,
        #             'message':'Great sucess',
        #             'data': serializer.data
        #         })
        # else:
        #     return JsonResponse('This role has no access' , safe = False)
    elif request.method == 'POST':

        # request.body will have the form data
        data = json.loads(request.body)
        user = WorkForce.objects.get(id = user_id)
        if user.role_id == 4:
            lab = Labs.objects.get(id = lab_id)
            if lab.workforce.id != int(user_id):
                return JsonResponse(data = {
                    'status': 401,
                    'message': 'Only lab owner has access'
                })
            lab.edit_approval = 0
            lab.start_time= data['start_time'][:2]
            lab.end_time= data['end_time'][:2]
            lab.name = data['name']
            lab.save()
            serializer = LabSerializer(lab , data = data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(data={
                'status':200,
                'message':'SUCCESS',
                'data': serializer.data,
            })
            else:
                return JsonResponse(data={
                'status':400,
                'message':'Invalid Data',
                'data': serializer.errors,
            })

        # if role_id == 3:
        #     uid = data['user_id']
        
        #     lab = Labs.objects.get(id = id)
        #     if lab.institute.id != uid:
        #         return JsonResponse(data = {
        #             'status': 401,
        #             'message': 'Only lab owner has access'
        #         })

        #     del data['user_id']
        #     del data['Role']

        #     serializer = LabSerializer(lab , data = data)
        #     if serializer.is_valid():
        #         serializer.save()
        #         return JsonResponse(data={
        #         'status':200,
        #         'message':'SUCCESS',
        #         'data': serializer.data,
        #     })
        else:
            return JsonResponse(data = {
                    'status':401,
                    'message':'This role has no access'
                }) 


@csrf_exempt
def getlabs(request,page_num):
    try:
        token = request.headers['Authorization']
    except:
        return JsonResponse(data= {
            "message":"Unauthorized Access, Please Login",
            "status":401
        })
    info = Check.check_auth(token)
    if info['status'] == 0:
        return JsonResponse(data= {
            "message":"Unauthorized Access, Please Login",
            "status":401
        })
    role_id = info['role_id']
    user_id = info['user_id']

    if request.method == 'GET':
        # List of institutes,city to populate in the drop down along with their ids in asceding order of their name
        institutes = Institutes.objects.filter(role_id = 3).values_list('id','name','city').order_by('name').all()

        labsobjs = Labs.objects.filter(status = 1).all()

        size = 3
        page = page_num
        paginator = Paginator(labsobjs, size)
        labs = paginator.get_page(page)
        serializer = LabSerializer(labs, many=True)

        labs_data = []
        for d in serializer.data:
            d = dict(d)
            d['institute_name'] = Institutes.objects.get(id = d['institute']).name
            workforce = WorkForce.objects.get(id = d['workforce'])
            d['workforce_name'] = workforce.name
            d['workforce_contact'] = workforce.phone_no
            d['workforce_email'] = workforce.email_id
            d['start_time'] = str(d['start_time'])+":00:00"
            d['end_time'] = str(d['end_time'])+":00:00"

            labs_data.append(d)

        return_data = {
            'status':200,
            'message':"All Labs fetched",
            'total_count':paginator.count,      # total number of labs
            'total_pages':paginator.num_pages,  # total number of pages
            'labs_data':labs_data,    # labs data on that page
            'institutes':list(institutes),      # list of institutes to populate in the dropdown
        }
        if labs.number == paginator.num_pages:
            return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(labs.number-1)
        elif labs.number == 1:
            return_data['next_page']=request.build_absolute_uri()[:-1]+str(labs.number+1)
        else:
            return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(labs.number-1)
            return_data['next_page']=request.build_absolute_uri()[:-1]+str(labs.number+1)
        return JsonResponse(return_data)

    # POST REQUEST FOR FILTER AND SEARCH 
    elif request.method == 'POST':
        institutes = Institutes.objects.filter(role_id = 3).values_list('id','name','city').order_by('name').all()
        bodyflag = 0
        # If searchtext is given then return searchtext, If one institute in the dropdown is given then return the institute id, if required date is given then return the date(type date)
        bodyflag = 1
        data = json.loads(request.body)

        if ('searchtext' in data) and ('institute_id' in data):
            search = data['searchtext']
            institute_id = int(data['institute_id'])
            
            labsobjs = Labs.objects.filter(name__icontains=search, institute = institute_id).all()

        elif ('searchtext' in data):
            search = data['searchtext']
            labsobjs = Labs.objects.filter(name__icontains=search).all()

        elif ('institute_id' in data):
            institute_id = data['institute_id']
            labsobjs = Labs.objects.filter(institute = institute_id).all()
        else:
            labsobjs = Labs.objects.all()

        if len(labsobjs) == 0:
            return JsonResponse({
            'status':404,
            'message':"No such Lab Found",
        })
        else: 
            size = 3
            page = page_num
            paginator = Paginator(labsobjs, size)
            labs = paginator.get_page(page)
            serializer = LabSerializer(labs, many=True)

            labs_data = []
            for d in serializer.data:
                d = dict(d)
                d['institute_name'] = Institutes.objects.get(id = d['institute']).name
                workforce = WorkForce.objects.get(id = d['workforce'])
                d['workforce_name'] = workforce.name
                d['workforce_contact'] = workforce.phone_no
                d['workforce_email'] = workforce.email_id
                d['start_time'] = str(d['start_time'])+":00:00"
                d['end_time'] = str(d['end_time'])+":00:00"
                labs_data.append(d)

            return_data = {
            'status':200,
            'message':"Resources Found",
            'total_count':paginator.count,
            'total_pages':paginator.num_pages,
            'labs_data':labs_data,
            'institutes':list(institutes)
            }

            if labs.number == paginator.num_pages and labs.number ==1:
                pass
            elif labs.number == paginator.num_pages:
                return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(labs.number-1)
            elif labs.number == 1:
                return_data['next_page']=request.build_absolute_uri()[:-1]+str(labs.number+1)
            else:
                return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(labs.number-1)
                return_data['next_page']=request.build_absolute_uri()[:-1]+str(labs.number+1)
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
def getdetails(request,lab_id,num):
    try:
        token = request.headers['Authorization']
    except:
        return JsonResponse(data= {
            "message":"Unauthorized Access, Please Login",
            "status":401
        })
    info = Check.check_auth(token)
    if info['status'] == 0:
        return JsonResponse(data= {
            "message":"Unauthorized Access, Please Login",
            "status":401
        })
    role_id = info['role_id']
    user_id = info['user_id']

    if request.method == "GET":

        labobj = Labs.objects.get(id = lab_id)
        serializer = LabSerializer(labobj)

        d = dict(serializer.data)
        d['institute_name'] = Institutes.objects.get(id = d['institute']).name
        workforce = WorkForce.objects.get(id = d['workforce'])
        d['workforce_name'] = workforce.name
        d['workforce_contact'] = workforce.phone_no
        d['workforce_email'] = workforce.email_id
        d['start_time'] = str(d['start_time'])+":00:00"
        d['end_time'] = str(d['end_time'])+":00:00"
        lab_data = d
        size = 3
        resourceobjs = Resources.objects.filter(lab = labobj)
        paginator = Paginator(resourceobjs , size)
        resources = paginator.get_page(num)
        rserializer = ResourcesSerializer(resources, many = True)

        imgs = []
        resources_data = []
        for d in rserializer.data:
            d = dict(d)
            try:
                img = Image.objects.filter(resource = d['id']).values_list('image')[0]
            except:
                img = ["media/resource_images/default_image.jpeg"]
            d['img'] = img[0]
            imgs.append(img)
            d['institute_name'] = labobj.institute.name
            resources_data.append(d)
        paster(imgs)

        return_data = {
            'status':200,
            'message':"Lab Details fetched",
            'lab_data':lab_data,
            'total_resource_count':paginator.count,
            'total_resource_pages':paginator.num_pages,
            'images':len(imgs),
            "resources_data": resources_data,
            'resource_images':imgs
        }

        if resources.number == paginator.num_pages:
            return_data['resource_previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
        elif resources.number == 1:
            return_data['resource_next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)
        else:
            return_data['resource_previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
            return_data['resource_next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)

        return JsonResponse(return_data)