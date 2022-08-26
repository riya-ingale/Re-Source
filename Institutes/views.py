from email import message
# from types import NoneType
from Institutes.serializers import *
from ResourceApp.serializers import *
from django.http.response import JsonResponse
from Institutes.models import *
from ResourceApp.models import *
from django.views.decorators.csrf import csrf_exempt
import json
import datetime
import os
from django.core.paginator import Paginator
import cv2
import shutil
from ReSource.utils import Check

from django.core.files import File
from django.http import HttpResponse
from rest_framework.decorators import api_view
from ReSource.settings import BASE_DIR, MEDIA_ROOT
@api_view(['GET'])
def DownloadPDF(self,type,filename):
    print(filename,type)
    if type == 'acc':
        path_to_file = MEDIA_ROOT +"/accredition"+ "/"+filename
        
        f = open(path_to_file, 'rb')
        pdfFile = File(f)
        response = HttpResponse(pdfFile.read())
        response['Content-Disposition'] = 'attachment'
        return response
    elif type=='invoice':
        path_to_file = "/PlaceOrder/templates/invoice.pdf"
    
        f = open(path_to_file, 'rb')
        pdfFile = File(f)
        response = HttpResponse(pdfFile.read())
        response['Content-Disposition'] = 'attachment'
        return response
    else:
        path_to_file = MEDIA_ROOT +"/sop"+ "/"+filename
        
        f = open(path_to_file, 'rb')
        pdfFile = File(f)
        response = HttpResponse(pdfFile.read())
        response['Content-Disposition'] = 'attachment'
        return response


def paster(imgs):
    leng = 0
    # print(imgs)
    for img in imgs:
        # print(img[0])
        print(img[0])
        temp = cv2.imread(img[0])
        if not isinstance(temp, type(None)):
            print(os.listdir("media/media/resource_images/"))
        # if temp:
        # # except Exception as e:
        #     # print(e)
        #     print("media/"+img[0])
        #     temp = cv2.imread("/media/"+img[0])
        #     print(temp +"error idhar hai")
        else:
            img_name = "media/media/resource_images/"+img[0].split('/')[-1]
            temp = cv2.imread(img_name)
        cv2.imwrite("./ReSource-FE/src/temp_images/temp"+str(leng+1)+".jpeg", temp)
        # file_name.append("../temp_images/temp"+str(leng+1)+"."+str(img[0].split('.')[-1]))
        leng+=1
    return

# Create your views here.
@csrf_exempt
def profile(request):
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse(data = {
                "status":401,
                "message":"Unauthorized Access"
            })
        role_id = info['role_id']
        id = info['user_id']
    except:
        return JsonResponse(data = {"status":401, "message":"Unauthorized Access"})

    if request.method == 'GET':
        if role_id == 1:
            curr_ins = Institutes.objects.get(id = id)
            serializer = InstituteSerializer(curr_ins)

            universities = Institutes.objects.filter(role_id = 2 , status = 1)
            userializer = InstituteSerializer(universities, many = True)

            pending_univ = Institutes.objects.filter(role_id = 2 , status = 0)
            pserializer = InstituteSerializer(pending_univ, many = True)

            ugc_staff = WorkForce.objects.filter(role_id = 9 , status = 1)
            staffserializer = WorkForceSerializer(ugc_staff , many = True)

            return JsonResponse({
                    'status' : 200,
                    'message' : 'fetched',
                    'data': serializer.data,
                    'universities':userializer.data,
                    'pending_universities':pserializer.data,
                    'ugc_staff':staffserializer.data
                })

        if role_id == 2:
            curr_ins = Institutes.objects.get(id = id)
            serializer = InstituteSerializer(curr_ins)

            institutes = Institutes.objects.filter(university = curr_ins.name, status = 1 , role_id = 3)
            iserializer = InstituteSerializer(institutes , many = True)

            pending_institute = Institutes.objects.filter(university = curr_ins.name, status = 0)
            piserializer = InstituteSerializer(pending_institute , many = True)

            
            return JsonResponse({
                    'status' : 200,
                    'message' : 'fetched',
                    'data': serializer.data,
                    'institute_data':iserializer.data,
                    'pending_institutes':piserializer.data
                })

        elif role_id == 6:
            student = Students.objects.get(id = id)
            serializer = StudentSerializer(student)
            return JsonResponse({
                'status': 200,
                'message':'Fetched',
                'data':serializer.data
            })
        
        elif role_id == 8:
            data = WorkForce.objects.get(id = id)
            institute = data.institute
            wfserializer = WorkForceSerializer(data)

            buytransactions = Order.objects.filter(institute = institute.id, payment_status = 1)  # Debit
            selltransactions = Transaction.objects.filter(seller_id = institute.id, is_paid = 1)  #Credit

            pen_or = []
            print(institute.id)
            pending_orders = Order.objects.filter(institute = institute.id , request_status = 10).all()
            pserializer = OrderSerializer(pending_orders, many = True)
            
            insti_data  = Institutes.objects.filter(id = institute.id)
            i_serializer = InstituteSerializer(insti_data,many=True)
            print(insti_data)
            for po in pserializer.data:
                dict(po)   
                print(po)
                order_id = po['id']
                workforce_id = po['workforce']
                po['workforce_name'] = WorkForce.objects.get(id = workforce_id).name
                po['seller_institutename'] = Institutes.objects.filter(id = int(po['institute']))[0].name
                products = ProductInOrder.objects.filter(order_id = order_id).all()

                productserializer = PIOSerializer(products, many = True)
                print(productserializer.data)
                po['products'] = productserializer.data
                # po['products'] = resource_name
                # po['institutes'] = institute_name
                pen_or.append(po)

            bserializer = OrderSerializer(buytransactions , many = True)
            sserializer = TransactionSerializer(selltransactions , many = True)
            sell_transactions = []
            for item in sserializer.data:
                item = dict(item)
                item['seller'] = Institutes.objects.get(id = item['seller']).name
                item['buyer'] = Institutes.objects.get(id = item['buyer']).name
                sell_transactions.append(item)
                
            

            return JsonResponse({
                'status':200,
                'message':'Fetched',
                'workforce':wfserializer.data,
                'bdata': bserializer.data,
                'sdata':sell_transactions,
                'pending_orders':pen_or,
                "institute_data":i_serializer.data,
            })
        
        elif role_id == 9:
            workforce = WorkForce.objects.get(id = id)
            serializer = WorkForceSerializer(workforce)

            remain_transactions = Transaction.objects.filter(is_paid = 0)
            rtserializer = TransactionSerializer(remain_transactions , many = True)

            completed_transactions = Transaction.objects.filter(is_paid = 1)
            ctserializer = TransactionSerializer(completed_transactions , many = True)

            return JsonResponse(data = {
                'status' : 200,
                'message': 'data Feteched',
                'workforce' : serializer.data,
                'remain_transactions':rtserializer.data,
                'completed_transactions':ctserializer.data
            })

        else:
            workforce = WorkForce.objects.get(id = id)
            wfserializer = WorkForceSerializer(workforce)
            return JsonResponse({
                'statues':200,
                'message': 'Fetched',
                'data': wfserializer.data
            })
            
    elif request.method == 'POST':
        if role_id in [1,2,3]:
            curr_ins = Institutes.objects.get(id = id) 
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
        elif role_id in [4,5,7,8,9]:
            curr_ins = WorkForce.objects.get(id = id) 
            data = json.loads(request.body)
            data['name'] = curr_ins.name
            data['email'] = curr_ins.email
            data['password'] = curr_ins.password
            serializer = WorkForceSerializer(curr_ins ,data = data)
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



@csrf_exempt      
def institute_proflie(request, r_num , l_num):
    if request.method == 'GET':
        try:
            token = request.headers['Authorization']
            info = Check.check_auth(token)

            if info['status'] == 0:
                return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })

            id = info['user_id']
        except:
            return JsonResponse(data = {
                'status': 401,
                "message": "Unauthorized Access"
            })

        curr_ins = Institutes.objects.get(id = id)
        serializer = InstituteSerializer(curr_ins)

        labsobjs = Labs.objects.filter(institute = id, status = 1)
        lab_ids = [lab.id for lab in labsobjs]
        size = 3
        paginator2 = Paginator(labsobjs , size)
        labs = paginator2.get_page(l_num)
        lserializer = LabSerializer(labs , many = True)


        workforce = WorkForce.objects.filter(institute = id , status = 1)
        wfserializer = WorkForceSerializer(workforce , many = True)

        
        print(lab_ids)
        resourceobjs = Resources.objects.filter(lab__in = lab_ids, is_approved = 1)

        paginator1 = Paginator(resourceobjs , size)
        resources = paginator1.get_page(r_num)
        rserializer = ResourcesSerializer(resources , many = True)

        imgs = []
        resource_data = []
        for d in rserializer.data:
            d = dict(d)
            try:
                img = Image.objects.filter(resource = d['id']).values_list('image')[0]
            except:
                img = ["media/resource_images/default_image.jpeg"]
            d['img'] = img[0]
            imgs.append(img)
            resource_data.append(d)
        print(imgs)
        paster(imgs)

        return_data = {
            'status':200,
            'message': 'All resource and labs fetched',
            'total_resource_count' : paginator1.count,
            'total_resource_pages': paginator1.num_pages,
            'resource_data': resource_data,
            'images':len(imgs),
            'total_lab_count':paginator2.count,
            'total_lab_pages':paginator2.num_pages,
            'lab_data':lserializer.data,
            'institute_data':serializer.data,
            'workforce_data':wfserializer.data
        }

        if resources.number == paginator1.num_pages:
            return_data['resource_previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
        elif resources.number == 1:
            return_data['resource_next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)
        else:
            return_data['resource_previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
            return_data['resource_next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)

        if labs.number == paginator2.num_pages:
            return_data['lab_previous_page'] = request.build_absolute_uri()[:-1]+str(labs.number-1)
        elif resources.number == 1:
            return_data['lab_next_page']=request.build_absolute_uri()[:-1]+str(labs.number+1)
        else:
            return_data['lab_previous_page'] = request.build_absolute_uri()[:-1]+str(labs.number-1)
            return_data['lab_next_page']=request.build_absolute_uri()[:-1]+str(labs.number+1)

        
        
        return JsonResponse(return_data)

@csrf_exempt
def workforce_profile(request , r_num , l_num):
    if request.method == "GET":
        try:
            token = request.headers['Authorization']
            info = Check.check_auth(token)

            if info['status'] == 0:
                return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })

            id = info['user_id']
        except:
            return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })


        workforce = WorkForce.objects.get(id = id)
        wfserializer = WorkForceSerializer(workforce)

        labsobjs = Labs.objects.filter(workforce = id)
        lab_ids = [lab.id for lab in labsobjs]

        size = 3
        paginator2 = Paginator(labsobjs , size)
        labs = paginator2.get_page(l_num)
        lserializer = LabSerializer(labs , many = True)
        
        
        print(lab_ids)
        resourceobjs = Resources.objects.filter(lab__in= lab_ids)
        paginator1 = Paginator(resourceobjs , size)
        resources = paginator1.get_page(r_num)
        rserializer = ResourcesSerializer(resources , many = True)

        imgs = []
        resource_data = []
        for d in rserializer.data:
            d = dict(d)
            try:
                img = Image.objects.filter(resource = d['id']).values_list('image')[0]
            except:
                img = ["media/resource_images/default_image.jpeg"]
            d['img'] = img[0]
            imgs.append(img)
            resource_data.append(d)
        
        paster(imgs)

        today_slots = Book_slots.objects.filter(lab__in = lab_ids , date = datetime.date.today())
        today_names = []
        for i in range(len(today_slots)):
            record = {}
            record['lab_name'] = today_slots[i].resource.lab.name
            record['resource_name'] = today_slots[i].resource.name
            today_names.append(record)
        todayserializer = BookslotSeializer(today_slots, many = True)

        tomorrow_slots = Book_slots.objects.filter(lab__in = lab_ids , date = datetime.date.today() + datetime.timedelta(days = 1))
        tomorrow_names = []
        for i in range(len(tomorrow_slots)):
            record = {}
            record['lab_name'] = tomorrow_slots[i].resource.lab.name
            record['resource_name'] = tomorrow_slots[i].resource.name
            tomorrow_names.append(record)
        tomserializer = BookslotSeializer(tomorrow_slots, many = True)

        return_data = {
            'status':200,
            'message': 'All resource and labs fetched',
            'total_resource_count' : paginator1.count,
            'total_resource_pages': paginator1.num_pages,
            'resource_data': resource_data,
            'images':len(imgs),
            'total_lab_count':paginator2.count,
            'total_lab_pages':paginator2.num_pages,
            'lab_data':lserializer.data,
            'workforce_data':wfserializer.data,
            'today_slots': todayserializer.data,
            'tomorrow_slots':tomserializer.data,
            'today_names':today_names,
            'tomrrow_names':tomorrow_names

        }
        if resources.number == paginator1.num_pages:
            return_data['resource_previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
        elif resources.number == 1:
            return_data['resource_next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)
        else:
            return_data['resource_previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
            return_data['resource_next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)

        if labs.number == paginator2.num_pages:
            return_data['lab_previous_page'] = request.build_absolute_uri()[:-1]+str(labs.number-1)
        elif resources.number == 1:
            return_data['lab_next_page']=request.build_absolute_uri()[:-1]+str(labs.number+1)
        else:
            return_data['lab_previous_page'] = request.build_absolute_uri()[:-1]+str(labs.number-1)
            return_data['lab_next_page']=request.build_absolute_uri()[:-1]+str(labs.number+1)

        return JsonResponse(return_data)



    
@csrf_exempt
def editprofile(request):
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })
        role_id = info['role_id']
        id = info['user_id']
    except:
        return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })

    if role_id in [1,2,3]:
        curr_ins = Institutes.objects.get(id = id)
        serializer = InstituteSerializer(curr_ins)
        return JsonResponse(data = {
            'message': 'Fetched',
            'data':serializer.data
        })
    
    elif role_id == 5:
        return JsonResponse(data = {
                'status':401,
                'message':"Unauthorized Access"
            })
    
    else:
        worker = WorkForce.objects.get(id = id)
        serializer = WorkForceSerializer(worker)
        return JsonResponse(data = {
            'message': 'Fetched',
            'data': serializer.data
        })
    
    #the edit form will be submitted on the post route itself

    # elif request.method == 'DELETE':
    #     curr_ins = Institutes.objects.get(name = id)
    #     curr_ins.delete()
    #     return JsonResponse('Record Deleted' , safe = False)


# def edit_lab(request, )

def allrequests(request,id, role_id):
    if request.method == 'GET':
        role_id = int(role_id)
        if role_id == 1:
            pending_universities = Institutes.objects.filter(role_id = 2, status = 0)
            serializer = InstituteSerializer(pending_universities , many = True)
            return JsonResponse(data = {
                'message' : 'Feteched Universities -->',
                'data' : serializer.data
            })
        
        elif role_id == 2:
            #username = request.session['username']
            name = Institutes.objects.get(id = id).name
            pending_institutes = Institutes.objects.filter(university = name , role_id = 3 , status = 0)
            serializer = InstituteSerializer(pending_institutes , many = True)
            return JsonResponse(data = {
                'message' : 'Feteched Institutions -->',
                'data' : serializer.data
            })
        
        elif role_id ==3:
            labs = Labs.objects.filter(institute = id).values_list('id').all()
            lab_ids = [ele[0] for ele in labs]
     
            pending_labs = Labs.objects.filter(institute = id , status = 0)
            lserializer = LabSerializer(pending_labs , many = True)

            lab_edits = Labs.objects.filter(institute = id , edit_approval = 0)
            leserializer = LabSerializer(lab_edits , many = True)

            resource_approve = Cart.objects.filter(seller_institute = id, is_approved = 0)
            raserializer = CartSerializer(resource_approve, many = True)

            add_resource = Resources.objects.filter(lab__in= lab_ids, is_approved = 0)
            arserializer = ResourcesSerializer(add_resource , many = True)

            resource_edits = Resources.objects.filter(lab__in= lab_ids , edit_approval = 0)
            reserializer = ResourcesSerializer(resource_edits , many = True)
            
            imgs = []
            resource_data = []
            for d in reserializer.data:
                d = dict(d)
                try:
                    img = Image.objects.filter(resource = d['id']).values_list('image')[0]
                except:
                    img = ["media/resource_images/default_image.jpeg"]
                d['img'] = img[0]
                imgs.append(img)
                resource_data.append(d)
            # print(imgs)
            paster(imgs)
            
            pending_workforce = WorkForce.objects.filter(institute = id , status = 0)
            wfserializer = WorkForceSerializer(pending_workforce , many = True)

            return JsonResponse(data = {
                'message':'Feteched',
                'workforce_data' : wfserializer.data,
                'lab_data' : lserializer.data,
                'lab_edit_requests':leserializer.data,
                'resource_edit_requests':reserializer.data,
                'resource_approve': raserializer.data,
                'add_resource':arserializer.data,
                'edit_img':len(imgs)
            })
        else:
            return JsonResponse('role has no access' , safe = False)
    else:
        return JsonResponse(data = {
            'status': 404,
            'message' : 'page not found'
        })




# post route for request acceptance 
@csrf_exempt
def institution_requests(request , id):
    if request.method == "POST":
        user = Institutes.objects.get(id = id)
        role_id = user.role_id
        if role_id == 1:
            data = json.loads(request.body)
            if data['role_id']!=2:
                return JsonResponse('You can only accept institutions' , safe = False)

            curr_ins = Institutes.objects.get(id = data['id'])
            curr_ins.status = data['status']
            serializer = InstituteSerializer(curr_ins)
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
                return JsonResponse('You can only handle institutes' , safe = False)
                
            curr_ins = Institutes.objects.get(id = data['id'])
            #Authenticate
            if curr_ins.university != user.name:
                return JsonResponse('Institute doesnot belong to your institution' , safe = False)
            curr_ins.status = data['status']
            serializer = InstituteSerializer(curr_ins)
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
        if role_id == 3:
            data = json.loads(request.body)
            worker = WorkForce.objects.get(id = data['id'])

            if worker.institute != id:
                return JsonResponse('Workforce member doesnot belong to your institution' , safe = False)

            worker.status = data['status']
            serializer = WorkForceSerializer(worker)
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

# @csrf_exempt
# def lab_request(request , id):
#     if request.method == "POST":
#         user = Institutes.objects.get(id = id)
#         role_id = user.role_id
#         if role_id == 3:
#             data = json.loads(request.body)
#             lab = Labs.objects.get(id = data['id'])
#             if lab.institute != id:
#                 return JsonResponse('Lab doesnt fall under your institution' , safe = False)
            
#             lab.status = data['status']
#             serializer = LabSerializer(lab)
#             if serializer.is_valid():
#                 serializer.save()
#                 return JsonResponse(data = {
#                     'status': 200,
#                     'message': 'Status Updated',
#                     'data': serializer.data
#                 })
#             else:
#                 return JsonResponse(data = {
#                     'status' : 400,
#                     'message': 'Invalid Data',
#                     'data' : serializer.errors
#                 })
#         else:
#             return JsonResponse(data = {
#                 'status': 401,
#                 'message': 'Role has no access'
#             })
    
#     else:
#         # user = Institutes.objects.get(id = id)
#         # role_id = user.role_id
#         # if role_id == 3:
#         #     labs = Labs.objects.filter(institute = id , status = 0)
#         #     lserializer = LabSerializer(labs , many = True)
#         #     d = []
#         #     for ele in lserializer.data:
#         #         print(ele)
#         #         ele['workforce_name'] = ele['workforce'].name
#         #         d.append(ele)
            
#         #     return JsonResponse(data = {
#         #         'status': 200,
#         #         'message': "Labs Fetched",
#         #         'data': d
        
#         #     })
#         # else:
#         return JsonResponse(data = {
#                 'status': 404,
#                 'message' : 'page not found'
#         })

@csrf_exempt
def resource_addrequest(request):
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse('Unauthorized access please login')
        role_id = info['role_id']
        id = info['user_id']
    except:
        return JsonResponse('Unauthorized access', safe = False)

    if request.method == "POST":
        if role_id == 3:
            data = json.loads(request.body)
            resource = Resources.objects.get(id = data['id'])
            
            if resource.lab.institute.id != id:
                return JsonResponse(data = {
                    'status': 401,
                    'message': 'Unauthorized access'
                })

            resource.is_approved = data['status']
            print(resource)
            serializer = ResourcesSerializer(resource)
            resource.save()
            return JsonResponse(data = {
                    'status': 200,
                    'message': 'Status Updated',
                    'data': serializer.data
                })
        else:
            return JsonResponse(data = {
                'status': 401,
                'message': 'Role has no access'
            })
    
    else:
        if role_id == 3:
            labs = Labs.objects.filter(institute = id)
            lab_ids = {}
            for ele in labs:
                lab_ids[ele.id] = [ele.name, ele.workforce.name]
            resources = Resources.objects.filter(lab__in = lab_ids.keys() , is_approved = 0)
            rserializer = ResourcesSerializer(resources , many = True)
            d = []
            imgs = []
            for ele in rserializer.data:
                dict(ele)
                print(ele['lab'])
                try:
                    img = Image.objects.filter(resource_id = ele['id']).values_list('image')[0]
                except Exception as e:
                    print(e)
                    img = ["media/resource_images/default_image.jpeg"]
                ele['image'] = img[0]
                imgs.append(img)
                ele['lab_name'], ele['workforce'] = lab_ids[ele['lab']]
                d.append(ele)
            paster(imgs)
            print(imgs)
            return JsonResponse(data = {
                'status': 200,
                'message': "Resources Fetched",
                'data': d,
                'images':len(imgs)
            })
        else:
            return JsonResponse(data = {
                'status': 404,
                'message' : 'page not found'
            })

@csrf_exempt
def resource_rentapproval(request):
    try:
        token = request.headers['Authorization']
        
        info = Check.check_auth(token)

        if info['status'] == 0:
            return JsonResponse('Unauthorized access please login')

        role_id = info['role_id']
        id = info['user_id']
    except:
        return JsonResponse(data = {"status":401, "message":"Unauthorized Access"})

    if request.method == 'POST':
        
        if role_id == 3:
            data = json.loads(request.body)
            item = Cart.objects.get(c_id = data['id'])
            print(type(item.seller_institute),type(id))
            if item.seller_institute != int(id):
                return JsonResponse('Access not allowed' , safe = False)

            item.is_approved = data['status']
            serializer = CartSerializer(item)
            item.save()
            return JsonResponse(data = {
                    'status': 200,
                    'message': 'Status Updated',
                    'data': serializer.data
                })
        else:
            return JsonResponse(data = {
                'status': 401,
                'message': 'Role has no access'
            })
    
    else:
        if role_id == 3:
            cart = Cart.objects.filter(seller_institute = id , is_approved = 0)
            cserializer = CartSerializer(cart , many = True)
            d = []
            imgs = []
            print(len(cart))
            for i in range(len(cart)):
                try:
                    img = Image.objects.filter(resource = cart[i].resource.id).values_list('image')[0]
                except:
                    img = ["media/resource_images/default_image.jpeg"]
                
                d.append({'buyer_institute':cart[i].workforce.institute.name , 
                'resource': cart[i].resource.name , 'bworkforce':cart[i].workforce.name
                ,'image':img[0]})
                imgs.append(img)
            paster(imgs)
            return JsonResponse(data = {
                'status':200,
                'message':'pending rent requests feteched',
                'resource_data': cserializer.data,
                'names_images':d
            })


@csrf_exempt
def workforce_requests(request):
    # GET route to show all the workforce requests to the institute role
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse('Unauthorized access please login')
        role = info['role_id']
        user_id = info['user_id']
        user = Institutes.objects.get(id = user_id)
    except:
        return JsonResponse('Unauthorized access', safe = False)

    if request.method == "GET":
        if role == 3:
            workforce_data = []
            workforces  = WorkForce.objects.filter(status = 0, institute = user_id)
            if workforces:
                serializer = WorkForceSerializer(workforces,many = True)
                for item in serializer.data:
                    item = dict(item)
                    item["institute_name"] = user.name
                    workforce_data.append(item)
                return JsonResponse(data = {
                'status': 200,
                'message' : 'Workforce Requests Fetched',
                "data" : workforce_data
                })
            else:
                return JsonResponse(data = {
                'status': 404,
                'message' : 'No Pending Workforce Requests'
                })
        else:
            return JsonResponse(data = {
            'status': 401,
            'message' : 'Unauthorized for you role'
        })
    # POST route to approve/ disapprove the workforce
    elif request.method == "POST":
        # try:
        #     user = Institutes.objects.filter(id = int(user_id))[0]
        # except:
        #     return JsonResponse(data = {
        #         'status': 401,
        #         'message' : 'Unauthorized for you role'
        #     })
        # role = rol
        if role == 3:
            data = json.loads(request.body)
            status = data['status']                # 1 for approved, -1 for rejected
            workforce_id = data["workforce_id"]    # the one who is approved or rejected
            try:
                workforce = WorkForce.objects.filter(id = int(workforce_id))[0]
            except:
                return JsonResponse(data = {
                'status': 400,
                'message' : 'Workforce id doesnt exist'
            })
            if workforce.institute_id != int(user_id):
                return JsonResponse(data = {
                'status': 401,
                'message' : 'Workforce doesnt belong to your institute'
            })
            action = ["",'approved', 'rejected']
            workforce.status = status
            workforce.save()
            serializer  = WorkForceSerializer(workforce)
            return JsonResponse(data = {
            'status': 200,
            'message' : f'Workforce {workforce.name} is {action[status]}',
            "data" : serializer.data
            })
        else:
            return JsonResponse(data = {
            'status': 401,
            'message' : 'Unauthorized for you role'
        })
        

@csrf_exempt
def lab_requests(request):
    # GET route to show all the workforce requests to the institute role
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })
        role = info['role_id']
        user_id = info['user_id']
        
        user = Institutes.objects.get(id = user_id)
        role = user.role_id
    except:
        return JsonResponse(data = {"status":401, "message":"Unauthorized Access"})

    if request.method == "GET":
        # try:
        #     user = Institutes.objects.get(id = user_id)
        # except:
        #     return JsonResponse(data = {
        #         'status': 401,
        #         'message' : 'No such Institute'
        #     })
        # role = user.role_id
        if role == 3:
            lab_data = []
            labs  = Labs.objects.filter(status = 0, institute_id = user.id)
            if labs:
                serializer = LabSerializer(labs,many = True)
                for item in serializer.data:
                    item = dict(item)
                    item["institute_name"] = user.name
                    workforce = WorkForce.objects.get(id = item['workforce'])
                    item['workforce_name'] = workforce.name
                    lab_data.append(item)
                return JsonResponse(data = {
                'status': 200,
                'message' : 'labdata Requests Fetched',
                "data" : lab_data
                })
            else:
                return JsonResponse(data = {
                'status': 404,
                'message' : 'No Pending lab Requests'
                })
        else:
            return JsonResponse(data = {
            'status': 401,
            'message' : 'Unauthorized for you role'
        })
    # POST route to approve/ disapprove the workforce
    elif request.method == "POST":
        try:
            user = Institutes.objects.get(id = int(user_id))
        except:
            return JsonResponse(data = {
                'status': 401,
                'message' : 'Unauthorized for you role'
            })
        role = user.role_id
        if role == 3:
            data = json.loads(request.body)
            lab_id = data["id"]    # the one who is approved or rejected
            try:
                lab = Labs.objects.get(id = int(lab_id))
            except:
                return JsonResponse(data = {
                'status': 400,
                'message' : 'Workforce id doesnt exist'
            })
            
            if lab.institute.id != int(user_id):
                return JsonResponse(data = {
                'status': 401,
                'message' : 'Workforce doesnt belong to your institute'
            })
            action = ["",'approved', 'rejected']
            lab.status = data['status']
            serializer  = LabSerializer(lab)
            lab.save()
            return JsonResponse(data = {
            'status': 200,
            'message' : f'Lab {lab.name} is {action[lab.status]}',
            "data" : serializer.data
            })
        else:
            return JsonResponse(data = {
            'status': 401,
            'message' : 'Unauthorized for you role'
        })

@csrf_exempt
def add_ugcstaff(request):
    token = request.headers['Authorization']
    info = Check.check_auth(token)
    if info['status'] == 0:
        return JsonResponse('Unauthorized access please login')
    role = info['role_id']
    if role !=1 : 
        return JsonResponse(data = {
            'status':401,
            'message': 'Role has no access',
        })
    if request.method == "POST":
        data = json.loads(request.body)
        email = data['email_id']
        try:
            user = WorkForce.objects.get(email_id = email)
            return JsonResponse(data = {
                'status':409,
                'message':'Email already exists'
            })
        except:
            data['institute'] = 2
            data['role_id'] = 9
            data['position'] = 'UGC Accounts'
            data['status'] = 1
        # print(data)
        serializer = WorkForceSerializer(data = data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(data = {
                'status': 200,
                'message': 'UGc_staff added',
                'data' : serializer.data
            })
        else:
            return JsonResponse('Data Invalid')


def sop_paster(files):
    for f in files:
        print(f)
        shutil.copy(f[1:], './ReSource-FE/src/temp_sop/')
    return

def accredition_paster(files):
    for f in files:
        print(f)
        shutil.copy(f[1:], './ReSource-FE/src/temp_accredition/')
    return


#Institute Requests Get and Post route
@csrf_exempt
def institute_requests(request):
    # GET route to show all the institute requests to the university role
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })
        role = info['role_id']
        user_id = info['user_id']
        
        university = Institutes.objects.get(id = user_id)
    except:
        return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })
    if request.method == "GET":
        # try:
        #     university = Institutes.objects.filter(id = int(user_id))[0]
        # except:
        #     return JsonResponse(data = {
        #         'status': 401,
        #         'message' : 'No such University'
        #     })
        # role = university.role_id
        if role == 2:
            sop = []
            accredition = []
            institute_data = []
            institutes  = Institutes.objects.filter(status = 0, university = university.name, role_id = 3).all()
            if institutes:
                serializer = InstituteSerializer(institutes,many = True)
                for item in serializer.data:
                    item = dict(item)
                    if item['sop']:
                        sop.append(item['sop'])
                    if item['accredition']:
                        accredition.append(item['accredition'])
                    institute_data.append(item)
                print("SOP - ",sop)
                print("accredition - ",accredition)
                if sop:
                    sop_paster(sop)
                if accredition:    
                    accredition_paster(accredition)

                return JsonResponse(data = {
                'status': 200,
                'message' : 'Institute Requests Fetched',
                "data" : institute_data,
                'sop' : sop,
                'accredition':accredition
                })
            else:
                return JsonResponse(data = {
                'status': 404,
                'message' : 'No Pending Institute Requests'
                })
        else:
            return JsonResponse(data = {
            'status': 401,
            'message' : 'Unauthorized for you role'
        })
        
    # POST route to approve/ disapprove the workforce
    elif request.method == "POST":
        # try:
        #     university = Institutes.objects.filter(id = int(user_id))[0]
        # except:
        #     return JsonResponse(data = {
        #         'status': 401,
        #         'message' : 'Unauthorized for you role'
        #     })
        # role = university.role_id
        if role == 2:
            data = json.loads(request.body)
            status = data['status']                # 1 for approved, -1 for rejected
            institute_id = data["institute_id"]    # the one who is approved or rejected
            try:
                institute = Institutes.objects.filter(id = int(institute_id))[0]
            except:
                return JsonResponse(data = {
                'status': 400,
                'message' : 'Institute id doesnt exist'
            })
            if institute.university != university.name:
                return JsonResponse(data = {
                'status': 401,
                'message' : 'Institute doesnt belong to your University'
            })
            action = ["",'approved', 'rejected']
            institute.status = status
            institute.save()
            serializer  = InstituteSerializer(institute)
            return JsonResponse(data = {
            'status': 200,
            'message' : f'Institute {institute.name} is {action[status]}',
            "data" : serializer.data
            })
        else:
            return JsonResponse(data = {
            'status': 401,
            'message' : 'Unauthorized for you role'
        })


# View all newly registerd universities for approval
@csrf_exempt
def university_requests(request):
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })
        user_id = info['user_id']
    except:
        return JsonResponse(data= {
            "message":"Unauthorized Access, Please Login",
            "status":401
        })
    # GET route to show all the institute requests to the university role
    
    ugc = Institutes.objects.get(id = user_id)
    role = ugc.role_id

    if request.method == "GET":
        # try:
        #     ugc = Institutes.objects.filter(id = int(user_id))[0]
        # except:
        #     return JsonResponse(data = {
        #         'status': 401,
        #         'message' : 'Not authorised for your role'
        #     })
        # role = ugc.role_id
        if role == 1:
            university_data = []
            sop = []
            accredition = []
            universities  = Institutes.objects.filter(status = 0, role_id = 2).all()
            if universities:
                serializer = InstituteSerializer(universities,many = True)
                for item in serializer.data:
                    item = dict(item)
                    if item['sop']:
                        sop.append(item['sop'])
                    if item['accredition']:
                        accredition.append(item['accredition'])
                    university_data.append(item)
                    
                print("SOP - ",sop)
                print("accredition - ",accredition)
                if sop:
                    sop_paster(sop)
                if accredition:    
                    accredition_paster(accredition)
                    university_data.append(item)
                return JsonResponse(data = {
                'status': 200,
                'message' : 'University Requests Fetched',
                "data" : university_data
                })
            else:
                return JsonResponse(data = {
                'status': 404,
                'message' : 'No Pending University Requests'
                })
        else:
            return JsonResponse(data = {
            'status': 401,
            'message' : 'Unauthorized for you role'
        })
        
    # POST route to approve/ disapprove the workforce
    elif request.method == "POST":
        try:
            ugc = Institutes.objects.filter(id = int(user_id))[0]
        except:
            return JsonResponse(data = {
                'status': 401,
                'message' : 'Unauthorized for you role'
            })
        role = ugc.role_id
        if role == 1:
            data = json.loads(request.body)
            status = data['status']                # 1 for approved, -1 for rejected
            university_id = data["university_id"]    # the one who is approved or rejected
            try:
                university = Institutes.objects.filter(id = int(university_id))[0]
            except:
                return JsonResponse(data = {
                'status': 400,
                'message' : 'University id doesnt exist'
            })
            action = ["",'approved', 'rejected']
            university.status = status
            university.save()
            serializer  = InstituteSerializer(university)
            return JsonResponse(data = {
            'status': 200,
            'message' : f'University {university.name} is {action[status]}',
            "data" : serializer.data
            })
        else:
            return JsonResponse(data = {
            'status': 401,
            'message' : 'Unauthorized for you role'
        })


# View all list of universities
@csrf_exempt
def get_university(request,page_num):
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse(data = {
                        'status':401,
                        'message':"Unauthorized Access"
                    })
    except:
        return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })
    if request.method == 'GET':
        # List of institutes,city to populate in the drop down along with their ids in asceding order of their name

        universityobjs = Institutes.objects.filter(role_id = 2, status = 1).all()
        size = 3
        page = page_num
        paginator = Paginator(universityobjs, size)
        university = paginator.get_page(page)
        serializer = InstituteSerializer(university, many=True)

        return_data = {
            'status':200,
            'message':"All University fetched",
            'total_count':paginator.count,      # total number of labs
            'total_pages':paginator.num_pages,  # total number of pages
            'university_data':serializer.data    # labs data on that page
        }
        if university.number == paginator.num_pages and university.number ==1:
            pass
        elif university.number == paginator.num_pages:
            return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(university.number-1)
        elif university.number == 1:
            return_data['next_page']=request.build_absolute_uri()[:-1]+str(university.number+1)
        else:
            return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(university.number-1)
            return_data['next_page']=request.build_absolute_uri()[:-1]+str(university.number+1)
        return JsonResponse(return_data)

    # POST REQUEST FOR FILTER AND SEARCH 
    elif request.method == 'POST':
        bodyflag = 0
        # If searchtext is given then return searchtext
        bodyflag = 1
        data = json.loads(request.body)

        if ('searchtext' in data):
            search = data['searchtext']
            universityobjs = Institutes.objects.filter(name__icontains=search, role_id = 2, status = 1).all()
        else:
            universityobjs = Institutes.objects.filter(role_id = 2, status = 1).all()

        if len(universityobjs) == 0:
            return JsonResponse({
            'status':404,
            'message':"No such University Found",
        })
        else: 
            size = 3
            page = page_num
            paginator = Paginator(universityobjs, size)
            university = paginator.get_page(page)
            serializer = InstituteSerializer(university, many=True)

            return_data = {
            'status':200,
            'message':"Universities Found",
            'total_count':paginator.count,
            'total_pages':paginator.num_pages,
            'data':serializer.data
            }

            if university.number == paginator.num_pages and university.number ==1:
                pass
            elif university.number == paginator.num_pages:
                return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(university.number-1)
            elif university.number == 1:
                return_data['next_page']=request.build_absolute_uri()[:-1]+str(university.number+1)
            else:
                return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(university.number-1)
                return_data['next_page']=request.build_absolute_uri()[:-1]+str(university.number+1)
            if bodyflag:
                return_data['body_data'] = data
            return JsonResponse(return_data)


# View all edit requests of resources
@csrf_exempt
def resource_editrequests(request):
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })
        role = info['role_id']
        user_id = info['user_id']
    
        institute = Institutes.objects.get(id = user_id)
    except:
        return JsonResponse(data = {"status":401, "message":"Unauthorized Access"})

    
    if request.method == "GET":
        # try:
        #     institute = Institutes.objects.filter(id = int(user_id))[0]
        # except:
        #     return JsonResponse(data = {
        #         'status': 401,
        #         'message' : 'No such Institute'
        #     })
        # role = institute.role_id
        if role == 3:
            labs = Labs.objects.filter(institute = institute).all()
            resources = Resources.objects.filter(lab__in = labs, edit_approval = 0, is_approved = 1).all()
            if resources:
                serializer = ResourcesSerializer(resources , many = True)
                resources_data = []
                imgs = []
                for item in serializer.data:
                    item = dict(item)
                    try:
                        img = Image.objects.filter(resource_id = item['id']).values_list('image')[0]
                    except Exception as e:
                        img = ["media/resource_images/default_image.jpeg"]
                    item['image'] = img[0]
                    imgs.append(img)
                    item['lab_name'] = Labs.objects.get(id = item['lab']).name
                    resources_data.append(item)
                paster(imgs)

                return JsonResponse(data = {
                'status': 200,
                'message' : 'Edited Resources Fetched',
                "data" : resources_data
                })
            else:
                return JsonResponse(data = {
                'status': 404,
                'message' : 'No Pending Edit Resource Requests'
                })
        else:
            return JsonResponse(data = {
            'status': 401,
            'message' : 'Unauthorized for you role'
        })
    elif request.method == "POST":
        # try:
        #     institute = Institutes.objects.filter(id = int(user_id))[0]
        # except:
        #     return JsonResponse(data = {
        #         'status': 401,
        #         'message' : 'Unauthorized for you role'
        #     })
        # role = institute.role_id
        if role == 3:
            data = json.loads(request.body)
            print("Data - ",data)
            status = data['status']              # 1 for approved, -1 for rejected
            resource_id = data['resource_id']    # the one who is approved or rejected
            try:
                resource = Resources.objects.filter(id = int(resource_id))[0]
            except:
                return JsonResponse(data = {
                'status': 400,
                'message' : 'Resource id doesnt exist'
            })
            if resource.lab.institute.id != institute.id:
                return JsonResponse(data = {
                'status': 401,
                'message' : 'Resource doesnt belong to your Institute'
            })
            action = ["",'approved', 'rejected']
            resource.edit_approval = status
            resource.save()
            serializer  = ResourcesSerializer(resource)
            return JsonResponse(data = {
            'status': 200,
            'message' : f'Resource {resource.name} is {action[status]}',
            "data" : serializer.data
            })
        else:
            return JsonResponse(data = {
            'status': 401,
            'message' : 'Unauthorized for you role'
        })

@csrf_exempt
def view_allinstitutes(request, page_num):
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


    if request.method == 'GET':

        instituteobjs = Institutes.objects.filter(role_id = 3, status = 1).all()
        if instituteobjs:

            size = 3
            page = page_num
            paginator = Paginator(instituteobjs, size)
            institutes = paginator.get_page(page)
            serializer = InstituteSerializer(institutes, many=True)


            return_data = {
                'status':200,
                'message':"All Institutes fetched",
                'total_count':paginator.count,      # total number of labs
                'total_pages':paginator.num_pages,  # total number of pages
                'institutes_data':serializer.data,    # labs data on that page
            }
            if institutes.number == paginator.num_pages and institutes.number ==1:
                pass
            elif institutes.number == paginator.num_pages:
                return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(institutes.number-1)
            elif institutes.number == 1:
                return_data['next_page']=request.build_absolute_uri()[:-1]+str(institutes.number+1)
            else:
                return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(institutes.number-1)
                return_data['next_page']=request.build_absolute_uri()[:-1]+str(institutes.number+1)
            return JsonResponse(return_data)
        else:
            return JsonResponse(data= {
                "message":"No Institutes to Show"
            })

    # POST REQUEST FOR SEARCH 
    elif request.method == 'POST':
        bodyflag = 0
        # If searchtext is given then return searchtext
        bodyflag = 1
        data = json.loads(request.body)

        if ('searchtext' in data):
            search = data['searchtext']
            instituteobjs = Institutes.objects.filter(name__icontains=search,role_id=3,status=1).all()
        else:
            instituteobjs = Institutes.objects.filter(role_id = 3, status = 1).all()

        if len(instituteobjs) == 0:
            return JsonResponse({
            'status':404,
            'message':"No such Institute Found",
        })
        else: 
            size = 3
            page = page_num
            paginator = Paginator(instituteobjs, size)
            institutes = paginator.get_page(page)
            serializer = InstituteSerializer(institutes, many=True)

            return_data = {
            'status':200,
            'message':"Resources Found",
            'total_count':paginator.count,
            'total_pages':paginator.num_pages,
            'institutes_data':serializer.data
            }

            if institutes.number == paginator.num_pages and institutes.number ==1:
                pass
            elif institutes.number == paginator.num_pages:
                return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(institutes.number-1)
            elif institutes.number == 1:
                return_data['next_page']=request.build_absolute_uri()[:-1]+str(institutes.number+1)
            else:
                return_data['previous_page'] = request.build_absolute_uri()[:-1]+str(institutes.number-1)
                return_data['next_page']=request.build_absolute_uri()[:-1]+str(institutes.number+1)
            if bodyflag:
                return_data['body_data'] = data
            return JsonResponse(return_data)
        


# View a Single Institute
@csrf_exempt
def view_institute(request, user_id, l_num, r_num):
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse(data = {
                        'status':401,
                        'message':"Unauthorized Access"
                    })
    except:
        return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })
    if request.method == "GET":
        try:
            institute = Institutes.objects.filter(id = user_id)[0]
        except:
            return JsonResponse(data={
                "message":"No such Institute",
                "status":404
            })
        size = 3
        if institute.role_id == 3:
            workforce = WorkForce.objects.filter(institute = user_id , status = 1)
            wfserializer = WorkForceSerializer(workforce , many = True)

            institute_serializer = InstituteSerializer(institute)
            labsobjs = Labs.objects.filter(institute = institute.id, status = 1)
            lab_ids = [lab.id for lab in labsobjs]
            paginator2 = Paginator(labsobjs,size)
            
            labs = paginator2.get_page(l_num)
            labs_serializer = LabSerializer(labs, many = True)
            lab_data = []
            for lab in labs_serializer.data:
                lab = dict(lab)
                start_time  = lab['start_time']+":00"
                lab['start_time'] = datetime.datetime.strptime(start_time, '%H:%M').time()
                end_time  = lab['end_time']+":00"
                lab['end_time'] = datetime.datetime.strptime(end_time, '%H:%M').time()
                lab['institute_name'] = Institutes.objects.filter(id = int(lab['institute']))[0].name
                lab['workforce_name'] = WorkForce.objects.get(id  = int(lab['workforce'])).name
                lab_data.append(lab)

            imgs = []
            resource_data = []
            resourceobjs = Resources.objects.filter(lab__in = lab_ids, is_approved = 1)
            paginator1 = Paginator(resourceobjs, size)
            resources = paginator1.get_page(r_num)
            resource_serializer = ResourcesSerializer(resources, many  =True)
            for resource in resource_serializer.data:
                resource = dict(resource)
                try:
                    img = Image.objects.filter(resource = resource['id']).values_list('image')[0]
                except:
                    img = ["media/resource_images/default_image.jpeg"]
                resource['img'] = img[0]
                imgs.append(img)
                lab_id = resource['lab']
                lab = Labs.objects.filter(id = lab_id)[0]
                ins = lab.institute.name
                resource['institute_name'] = ins
                resource_data.append(resource)
            paster(imgs)
            
            return_data = {
            'status':200,
            'message': 'All resource and labs fetched',
            'total_resource_count' : paginator1.count,
            'total_resource_pages': paginator1.num_pages,
            'resource_data': resource_data,
            'images':len(imgs),
            'total_lab_count':paginator2.count,
            'total_lab_pages':paginator2.num_pages,
            'lab_data':lab_data,
            'institute_data':institute_serializer.data,
            'workforce_data':wfserializer.data
            }
            if resources.number == paginator1.num_pages:
                return_data['resource_previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
            elif resources.number == 1:
                return_data['resource_next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)
            else:
                return_data['resource_previous_page'] = request.build_absolute_uri()[:-1]+str(resources.number-1)
                return_data['resource_next_page']=request.build_absolute_uri()[:-1]+str(resources.number+1)

            if labs.number == paginator2.num_pages:
                return_data['lab_previous_page'] = request.build_absolute_uri()[:-1]+str(labs.number-1)
            elif resources.number == 1:
                return_data['lab_next_page']=request.build_absolute_uri()[:-1]+str(labs.number+1)
            else:
                return_data['lab_previous_page'] = request.build_absolute_uri()[:-1]+str(labs.number-1)
                return_data['lab_next_page']=request.build_absolute_uri()[:-1]+str(labs.number+1)

            return JsonResponse(return_data)

        else:
            return JsonResponse(data  ={
                "message":"No such Institute",
                "status":404
            })

# View a single University
@csrf_exempt
def view_university(request, user_id):
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse('Unauthorized access please login')
    except:
        return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })
    
    if request.method == "GET":
        try:
            university = Institutes.objects.filter(id = user_id)[0]
        except:
            return JsonResponse(data={
                "message":"No such University",
                "status":404
            })
        if university.role_id == 2:
            university_serializer = InstituteSerializer(university)
            institutes = Institutes.objects.filter(university = university.name, status = 1, role_id  =3).all()
            institute_serializer = InstituteSerializer(institutes, many = True)
            institute_data = []
            for ins in institute_serializer.data:
                ins = dict(ins)
                institute_data.append(ins)

            return JsonResponse(data = {
                "status":200,
                "message":"University data fetched",
                "university_data":university_serializer.data,
                "institute_data":institute_data
            })
        else:
            return JsonResponse(data  ={
                "message":"No such University",
                "status":404
            })


def view_labAssitant(request,user_id):
    try:
        token = request.headers['Authorization']
        info = Check.check_auth(token)
        if info['status'] == 0:
            return JsonResponse('Unauthorized access please login')
    except:
        return JsonResponse(data = {
                    'status':401,
                    'message':"Unauthorized Access"
                })

    if request.method == "GET":

        try:
            workforce = WorkForce.objects.get(id  =int(user_id))
        except:
            return JsonResponse(data = {
                "message":"No workforce Found",
                "status":404
            })
        if workforce:
            role = workforce.role_id
            if role == 4:
                serializer = WorkForceSerializer(workforce)
                data = serializer.data

                labs = Labs.objects.filter(workforce= workforce).all()
                lab_serializer = LabSerializer(labs, many = True)
                labs_data = []
                for lab in lab_serializer.data:
                    d = dict(lab)
                    d['institute_name'] = Institutes.objects.get(id = d['institute']).name
                    workforce = WorkForce.objects.get(id = d['workforce'])
                    d['workforce_name'] = workforce.name
                    d['workforce_contact'] = workforce.phone_no
                    d['workforce_email'] = workforce.email_id
                    d['start_time'] = str(d['start_time'])+":00:00"
                    d['end_time'] = str(d['end_time'])+":00:00"
                    labs_data.append(d)
                if labs:
                    resources = Resources.objects.filter(lab__in = labs).all()
                    resource_serializer = ResourcesSerializer(resources, many = True)
                    return JsonResponse(data = {
                        "message":"Workforce Details Fetched",
                        "status":200,
                        "data":data,
                        "labs_data":labs_data,
                        "resources_data":resource_serializer.data
                    })
                else:
                    return JsonResponse(data  = {
                        "message":"Workforce Details fetched",
                        "status":200,
                        "data":data
                })
            else:
                return JsonResponse(data = {
                    "message":"Workforce Not Found",
                    "status":404
                })
        else:
            return JsonResponse(data ={
                "message":"No such User",
                "status":404
            })
