from django.shortcuts import render, HttpResponse
from Institutes.serializers import *
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from Institutes.models import *
from ResourceApp.models import *
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
@csrf_exempt
def profile(request, username):
    # if 'username' in request.session:
    # role_id = request.session['role_id']

    curr_ins = Institutes.objects.get(name = username)
    role_id = curr_ins.role_id
    if role_id == 3:
        if request.method == 'GET':
            serializer = InstituteSerializer(curr_ins)
            return JsonResponse({
                'status' : 200,
                'message' : 'fetched',
                'data': serializer.data
            })

            # return render(request, 'profile.html' , curr_ins)
        
        elif request.method == 'POST':
            data = json.loads(request.body)
            data['name'] = curr_ins.name
            data['email'] = curr_ins.email
            data['password'] = curr_ins.password
            serializer = InstituteSerializer(curr_ins ,data = data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(data = {
                    'message': 'Success',
                    'data' : serializer.data
                })
            else:
                return JsonResponse(data = {
                    'status':400,
                    'message': 'Invalid Data',
                    'data': serializer.errors
                })
       
    else:
        return JsonResponse(data = {
            'status':401,
            'message' : 'Nahi jaga hai, role badal'
        })  

def editprofile(request, username):
    curr_ins = Institutes.objects.get(name = username)
    role_id = curr_ins.role_id
    if role_id == 3:
        if request.method == 'GET':
            curr_ins = Institutes.objects.get(name = username)
            serializer = InstituteSerializer(curr_ins)
            return JsonResponse(data = {
                'message': 'Fetched',
                'data':serializer.data
            })
        
        #the edit form will be submitted on the post route itself

        elif request.method == 'DELETE':
            curr_ins = Institutes.objects.get(name = username)
            curr_ins.delete()
            return JsonResponse('Record Deleted' , safe = False)


def allrequests(request,id):
    # role_id = request.session['role_id']
    # id = request.session['id']
    if request.method == 'GET':
        data = Institutes.objects.get(id = id)
        role_id = data.role_id
        if role_id == 1:
            pending_universities = Institutes.objects.filter(role_id = 2, status = 0)
            serializer = InstituteSerializer(pending_universities , many = True)
            return JsonResponse(data = {
                'message' : 'Feteched Universities -->',
                'data' : serializer.data
            })
        
        elif role_id == 2:
            #username = request.session['username']
            name = data.name
            pending_institutes = Institutes.objects.filter(university = name , role_id = 3 , status = 0)
            serializer = InstituteSerializer(pending_institutes , many = True)
            return JsonResponse(data = {
                'message' : 'Feteched Institutions -->',
                'data' : serializer.data
            })
        
        elif role_id ==3 or role_id == 4:
            pending_labs = Labs.objects.filter(institute = id , status = 0)
            lserializer = LabSerializer(pending_labs , many = True)

            if role_id == 3:
                pending_workforce = WorkForce.objects.filter(institute = id , status = 0)
                wfserializer = WorkForceSerializer(pending_workforce , many = True)
                return JsonResponse(data = {
                    'message':'Feteched',
                    'workforce_data' : wfserializer.data,
                    'lab_data' : lserializer.data
                })
            return JsonResponse(data = {
                    'message':'Feteched',
                    'lab_data' : lserializer.data
                })
    else:
        return JsonResponse(data = {
            'status': 404,
            'message' : 'page not found'
        })

# post route for request acceptance 
@csrf_exempt
def institution_request(request , id):
    if request.method == "POST":
        # if request.session.Role in [1,2,3]:
        user = Institutes.objects.get(id = id)
        role_id = user.role_id
        if role_id == 1:
            data = json.loads(request.body)
            curr_ins = Institutes.objects.get(id = data['id'])

            if data['university']!= user.name:
                return JsonResponse('Institution is not under your university' , safe = False)

            serializer = InstituteSerializer(curr_ins , data = data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(data = {
                    'status': 200,
                    'message': 'Status Updated',
                    'data': serializer.data
                })
            else:
                return JsonResponse(data = {
                    'status' : 400,
                    'message': 'Invalid Data',
                    'data' : serializer.errors
                })
        elif role_id == 2:
            data = json.loads(request.body)
            if data['role_id']!=3:
                return JsonResponse('You cannot remove admin' , safe = False)
                
            curr_ins = Institutes.objects.get(id = data['id'])
            #if data['university']!= request.session['username']:
            #return not allowed
            serializer = InstituteSerializer(curr_ins , data = data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(data = {
                    'status': 200,
                    'message': 'Status Updated',
                    'data': serializer.data
                })
            else:
                return JsonResponse(data = {
                    'status' : 400,
                    'message': 'Invalid Data',
                    'data' : serializer.errors
                })
        else:
            return JsonResponse(data = {
                'status': 401,
                'message': 'Role has no access'
            })
    
    else:
        return JsonResponse(data = {
            'status': 404,
            'message' : 'page not found'
        })

@csrf_exempt
def workforce_request(request , id):
    if request.method == "POST":
        user = Institutes.objects.get(id = id)
        role_id = user.role_id
        #role_id = request.session['Role']
        if role_id == 3:
            data = json.loads(request.body)
            worker = WorkForce.objects.get(id = data['id'])
            serializer = WorkForceSerializer(worker , data = data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(data = {
                    'status': 200,
                    'message': 'Status Updated',
                    'data': serializer.data
                })
            else:
                return JsonResponse(data = {
                    'status' : 400,
                    'message': 'Invalid Data',
                    'data' : serializer.errors
                })
        else:
            return JsonResponse(data = {
                'status': 401,
                'message': 'Role has no access'
            })
    
    else:
        return JsonResponse(data = {
            'status': 404,
            'message' : 'page not found'
        })

@csrf_exempt
def lab_request(request , id):
    if request.method == "POST":
        user = Institutes.objects.get(id = id)
        role_id = user.role_id
        if role_id in [3,4]:
            data = json.loads(request.body)
            lab = Labs.objects.get(id = data['id'])
            serializer = LabSerializer(lab , data = data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(data = {
                    'status': 200,
                    'message': 'Status Updated',
                    'data': serializer.data
                })
            else:
                return JsonResponse(data = {
                    'status' : 400,
                    'message': 'Invalid Data',
                    'data' : serializer.errors
                })
        else:
            return JsonResponse(data = {
                'status': 401,
                'message': 'Role has no access'
            })
    
    else:
        return JsonResponse(data = {
            'status': 404,
            'message' : 'page not found'
        })


                