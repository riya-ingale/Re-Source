# from sqlite3 import dbapi2
# from django.views.decorators.csrf import csrf_exempt
# import pandas as pd
# import json
# from django.http.response import JsonResponse
# from ResourceApp.models import *
# from Institutes.models import *


# @csrf_exempt
# def add_students(request , id):
#     if request.method == 'GET':
#         data = json.loads(request.body)
#         role_id = data['Role']
#         if role_id!=4 or role_id!=5:
#             return JsonResponse('Access not allowed' , safe = False)
#         items = Cart.objects.filter(workforce = id)
#         dates = {}
#         for ele in items:
#             try:
#                 dates[ele.date].append(Institutes.objects.get(id = ele.seller))
#             except:
#                 dates[ele.date] = [Institutes.objects.get(id = ele.seller)]
#         return JsonResponse(data = {
#             'status' : 200,
#             'message': 'dates fetched',
#             'data'   : dates
#         })

#     else:
#         data = json.loads(request.body)
#         items = Cart.objects.filter(workforce = id)
#         elements = [f'{ele.seller}/{ele.date}' for ele in items]
#         for ele in elements:
#             # add in db
        
