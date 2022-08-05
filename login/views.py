from wsgiref.util import request_uri
from django.shortcuts import render, HttpResponse, redirect
from ResourceApp.serializers import ResourcesSerializer
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from Institutes.models import *
from ResourceApp.models import *
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password, check_password
import json
# Create your views here.


# @csrf_exempt
# def register(request,id=0):
#     if request.method == 'POST':
#         users = 

@csrf_exempt
def signup(request,id = 0):
     if request.method == "POST":
        logindata = json.loads(request.body)
        username = logindata['lusername']
        password = logindata['lpassword']
        try:
            if id in [1,2,3,7,8]:
                t = Institutes.objects.get(email = username)
                # if check_password(password, t.password):
                if password == t.password:
                    request.session['username'] = username   
                    return JsonResponse({'status':200,'username':username})
                else:
                    return HttpResponse("Password Incorrect")  
            elif id in [4,5]:
                t = WorkForce.objects.get(email_id = username)
                if password == t.password:
                    request.session['username'] = username   
                    return JsonResponse({'status':200,'username':username})
                else:
                    return HttpResponse("Password Incorrect")  
            elif id == 6:
                t = Students.objects.get(email = username)
                if password == t.password:
                    request.session['username'] = username   
                    return JsonResponse({'status':200,'username':username})
                else:
                    return HttpResponse("Password Incorrect")  
            else:
                return HttpResponse("LOGIN FAILED")
            # redirect to success page
        except:    
            return HttpResponse("LOGIN FAILED")
    