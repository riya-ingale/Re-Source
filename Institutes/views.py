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
def profile(request):
    if 'user_name' in request.session:
        if request.session['role_id'] == 2:
            if request.method == 'GET':
                curr_ins = Institutes.objects.get(username = request.session['user_name'])
                serializer = InstituteSerializer(curr_ins)
                return JsonResponse({
                    'status' : 200,
                    'message' : 'All resource fetched',
                    'data': serializer.data
                })
                # return render(request, 'profile.html' , curr_ins)
            
            elif request.method == 'POST':
                data = json.loads(request.body)
                #print(data)
                serializer = InstituteSerializer(data = data)
                if serializer.is_valid():
                    serializer.save()
                    return JsonResponse(data = {
                        'message': 'Success',
                        'data' : serializer.data
                    })
            
            elif request.method == 'PUT':
                curr_ins = Institutes.objects.get(username = request.session['user_name'])
                data = json.loads(request.body)
                serializer = InstituteSerializer(curr_ins , data = data)
                if serializer.is_valid():
                    serializer.save()
                    return JsonResponse(data = {
                        'message' : 'Updated',
                        'data': serializer.data
                    })
            
            else:
                curr_ins = Institutes.objects.get(username = request.session['user_name'])
                curr_ins.delete()
                return JsonResponse('Record Deleted' , safe = False)
                


                #retrieve fields from form, and update the data
                


                