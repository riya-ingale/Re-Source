from django.shortcuts import render, HttpResponse
from Institutes.serializers import InstituteSerializer
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





                