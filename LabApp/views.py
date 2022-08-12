from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from Institutes.models import *
from ResourceApp.models import Book_slots
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
        if workforce.role_id == 4:
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
            uid = user['id']
            lab = Labs.objects.get(id = id)
            serializer = LabSerializer(lab)
            if lab.workforce != uid:
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
            uid = user['id']
            lab = Labs.objects.get(id = id)
            serializer = LabSerializer(lab)
            if lab.institute != uid:
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
            uid = data['uid']
        
            lab = Labs.object.get(id = id)
            if lab.workforce != uid:
                return JsonResponse(data = {
                    'status': 401,
                    'message': 'Only lab owner has access'
                })
            del data['uid']
            del data['Role']

            data['edit_approval'] = 0

            serializer = LabSerializer(lab , data = data)
            if serializer.is_valid:
                serializer.save()
                return JsonResponse(data={
                'status':200,
                'message':'SUCCESS',
                'data': serializer.data,
            })

        else:
            return JsonResponse('This role has no access' , safe = False) 




