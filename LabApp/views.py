from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from Institutes.models import *
from ResourceApp.models import *
from Institutes.serializers import *
from ResourceApp.serializers import *
import json
from django.http.response import JsonResponse

# Create your views here.

@csrf_exempt
def addlab(request):
    if request.method == "POST":
        # After filling all the details and submitting the form, Workforceid(one who is creating the lab) will be sent from frontend along with form details

        # Eg. {
        #     "user_id":1,
        #     "name":"Biology Lab",
        #     "start_time":"01:00",
        #     "end_time":"18:00"
        # }

        data = json.loads(request.body)
        workforce_id = data['user_id']
        data["workforce"] = workforce_id

        # considering start_time and end_time were taken from time input field, 24hr clock
        data['start_time'] = data['start_time'][:2]
        data['end_time'] = data['end_time'][:2]
        workforce = WorkForce.objects.filter(id = workforce_id)[0]
        data['institute'] = workforce.institute.id
        
        if workforce.role_id == 4: # only Lab Assistant can add labs
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


## for post route of csrf send role and userid as well for authentication           
@csrf_exempt
def edit_lab(request ,id):
    #id === lab_id
    if request.method == 'GET':
        user = json.loads(request.body)
        role_id = user['Role']
        if role_id == 4:       
            uid = user['user_id']
            lab = Labs.objects.get(id = id)
            serializer = LabSerializer(lab)
            if lab.workforce.id != uid:
                return JsonResponse(data = {
                    'status': 401,
                    'message': 'Only lab owner has access'
                })
            else:
                return JsonResponse(data = {
                    'status':200,
                    'message':'Great sucess',
                    'data': serializer.data
                })
        elif role_id == 3:       
            uid = user['user_id']
            lab = Labs.objects.get(id = id)
            serializer = LabSerializer(lab)
            if lab.institute.id != uid:
                return JsonResponse(data = {
                    'status': 401,
                    'message': 'Only lab owner has access'
                })
            else:
                
                return JsonResponse(data = {
                    'status':200,
                    'message':'Great sucess',
                    'data': serializer.data
                })
        else:
            return JsonResponse('This role has no access' , safe = False)
    
    else:
        data = json.loads(request.body)
        role_id = data['Role']
        if role_id == 4:
            uid = data['user_id']
        
            lab = Labs.objects.get(id = id)
            if lab.workforce.id != uid:
                return JsonResponse(data = {
                    'status': 401,
                    'message': 'Only lab owner has access'
                })
            del data['user_id']
            del data['Role']

            data['edit_approval'] = 0

            serializer = LabSerializer(lab , data = data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(data={
                'status':200,
                'message':'SUCCESS',
                'data': serializer.data,
            })
        
        if role_id == 3:
            uid = data['user_id']
        
            lab = Labs.objects.get(id = id)
            if lab.institute.id != uid:
                return JsonResponse(data = {
                    'status': 401,
                    'message': 'Only lab owner has access'
                })

            del data['user_id']
            del data['Role']

            serializer = LabSerializer(lab , data = data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(data={
                'status':200,
                'message':'SUCCESS',
                'data': serializer.data,
            })


        else:
            return JsonResponse('This role has no access' , safe = False) 




