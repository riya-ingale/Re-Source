from django.shortcuts import render, HttpResponse
from Institutes.serializers import InstituteSerializer
from rest_framework.response import Response
from rest_framework.parsers import JSONparser
from django.http.response import JsonResponse
from Institutes.models import *
from ResourceApp.models import *
from django.views.decorators.csrf import crsf_exempt
import json

# Create your views here.
@csrf_exempt
def profile(request):

    if 'id' in request.session:
        if request.session['role_id'] == 2:
            curr_ins = Institutes.objects.filter(id = request.session['id'])[0]
            if request.method == 'GET':
                return render(request, 'profile.html' , curr_ins)
            
            else:
                data = json.loads(request.body)
                
                #retrieve fields from form, and update the data
                


                