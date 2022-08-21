from pprint import isreadable
from Institutes.serializers import *
from ResourceApp.serializers import *
from django.http.response import JsonResponse
from Institutes.models import *
from ResourceApp.models import *
from django.views.decorators.csrf import csrf_exempt
import json
import datetime

# Create your views here.
@csrf_exempt
def profile(request, id , role_id):
    if request.method == 'GET':
        role_id = int(role_id)
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
                
        elif role_id == 3:
            curr_ins = Institutes.objects.get(id = id)

            labs = Labs.objects.filter(institute = id, status = 1)
            lserializer = LabSerializer(labs , many = True)

            workforce = WorkForce.objects.filter(institute = id , status = 1)
            wfserializer = WorkForceSerializer(workforce , many = True)

            lab_ids = [lab.id for lab in labs]
            print(lab_ids)
            resource = Resources.objects.filter(lab__in = lab_ids, is_approved = 1)
            rserializer = ResourcesSerializer(resource , many = True)

            serializer = InstituteSerializer(curr_ins)
            
            return JsonResponse({
                'status' : 200,
                'message' : 'fetched',
                'institute_data': serializer.data,
                'Labs_data': lserializer.data,
                'Workforce_data':wfserializer.data,
                'resource_data' : rserializer.data 
            })
        
        elif role_id == 4:
            labs = Labs.objects.filter(workforce = id)
            lserializer = LabSerializer(labs , many = True)
            
            lab_ids = [lab.id for lab in labs]
            resource = Resources.objects.filter(lab__in= lab_ids)
            rserializer = ResourcesSerializer(resource , many = True)

            today_slots = Book_slots.objects.filter(lab__in = lab_ids , date = datetime.date.today())
            todayserializer = BookslotSeializer(today_slots, many = True)

            tomorrow_slots = Book_slots.objects.filter(lab__in = lab_ids , date = datetime.date.today() + datetime.timedelta(days = 1))
            tomserializer = BookslotSeializer(tomorrow_slots, many = True)


            return JsonResponse({
                'status': 200,
                'message': 'Fetched',
                'lab_data': lserializer.data,
                'resource_data' : rserializer.data,
                'today_slots': todayserializer.data,
                'tomorrow_slots':tomserializer.data

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

            buytransactions = Order.objects.filter(institute = institute.id, payment_status = 1)
            selltransactions = Transaction.objects.filter(seller = institute)

            pending_orders = Order.objects.filter(institute = institute.id , request_status = 0)
            pserializer = OrderSerializer(pending_orders, many = True)

            bserializer = OrderSerializer(buytransactions , many = True)
            sserializer = TransactionSerializer(selltransactions , many = True)

            return JsonResponse({
                'status':200,
                'message':'Fetched',
                'workforce':wfserializer.data,
                'bdata': bserializer.data,
                'sdata':sserializer.data,
                'pending_orders':pserializer.data
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
       
    
@csrf_exempt
def editprofile(request, id, role_id):

    if request.method == 'GET':
        if role_id in [1,2,3]:
            curr_ins = Institutes.objects.get(id = id)
            serializer = InstituteSerializer(curr_ins)
            return JsonResponse(data = {
                'message': 'Fetched',
                'data':serializer.data
            })
        
        elif role_id == 5:
            return JsonResponse('Access not allowed' , safe = False)
        
        else:
            worker = WorkForce.objects.get(id = id)
            serializer = WorkForceSerializer(worker)
            return JsonResponse(data = {
                'message': 'Fetched',
                'data': serializer.data
            })
    
    #the edit form will be submitted on the post route itself

    elif request.method == 'DELETE':
        curr_ins = Institutes.objects.get(name = id)
        curr_ins.delete()
        return JsonResponse('Record Deleted' , safe = False)


# def edit_lab(request, )

def allrequests(request,id, role_id):
    if request.method == 'GET':
        role_id = role_id
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

            resource_approve = Cart.objects.filter(seller = id, is_approved = 0)
            raserializer = CartSerializer(resource_approve, many = True)

            add_resource = Resources.ojbects.filter(institute = id , status = 0)
            arserializer = ResourcesSerializer(add_resource , many = True)

            resource_edits = Resources.objects.filter(lab__in= lab_ids , edit_approval = 0)
            reserializer = ResourcesSerializer(resource_edits , many = True)

            pending_workforce = WorkForce.objects.filter(institute = id , status = 0)
            wfserializer = WorkForceSerializer(pending_workforce , many = True)

            return JsonResponse(data = {
                'message':'Feteched',
                'workforce_data' : wfserializer.data,
                'lab_data' : lserializer.data,
                'lab_edit_requests':leserializer.data,
                'resource_edit_requests':reserializer.data,
                'resource_approve': raserializer.data,
                'add_resource':arserializer.data
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
def institution_request(request , id):
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

@csrf_exempt
def lab_request(request , id):
    if request.method == "POST":
        user = Institutes.objects.get(id = id)
        role_id = user.role_id
        if role_id == 3:
            data = json.loads(request.body)
            lab = Labs.objects.get(id = data['id'])
            if lab.institute != id:
                return JsonResponse('Lab doesnt fall under your institution' , safe = False)
            
            lab.status = data['status']
            serializer = LabSerializer(lab)
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
def resource_request(request , id):
    if request.method == "POST":
        user = Institutes.objects.get(id = id)
        role_id = user.role_id
        if role_id == 3:
            data = json.loads(request.body)
            resource = Resources.objects.get(id = data['id'])
            if resource.institute != id:
                return JsonResponse('Resource doesnt fall under your institution' , safe = False)
            
            resource.status = data['status']
            serializer = ResourcesSerializer(resource)
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
def resource_approval(request , id):
    if request.method == 'POST':
        user = Institutes.objects.get(id = id)
        role_id = user.role_id
        if role_id == 3:
            data = json.loads(request.body)
            item = Cart.objects.get(id = data['id'])

            if item.seller != id:
                return JsonResponse('Access not allowed' , safe = False)

            item.is_approved = data['status']
            serializer = CartSerializer(item)
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
def workforce_requests(request , user_id):
    # GET route to show all the workforce requests to the institute role
    if request.method == "GET":
        try:
            user = Institutes.objects.filter(id = int(user_id))[0]
        except:
            return JsonResponse(data = {
                'status': 401,
                'message' : 'No such Institute'
            })
        role = user.role_id
        if role == 3:
            workforce_data = []
            workforces  = WorkForce.objects.filter(status = 0, institute_id = user.id).all()
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
        try:
            user = Institutes.objects.filter(id = int(user_id))[0]
        except:
            return JsonResponse(data = {
                'status': 401,
                'message' : 'Unauthorized for you role'
            })
        role = user.role_id
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
def lab_requests(request , user_id):
    # GET route to show all the workforce requests to the institute role
    if request.method == "GET":
        try:
            user = Institutes.objects.get(id = user_id)
        except:
            return JsonResponse(data = {
                'status': 401,
                'message' : 'No such Institute'
            })
        role = user.role_id
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




                