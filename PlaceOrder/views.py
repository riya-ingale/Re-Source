from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render
from django.http.response import JsonResponse
from ResourceApp.models import *
from Institutes.models import *
from django.template.loader import get_template, render_to_string
from django.contrib.sites.shortcuts import get_current_site
from ResourceApp.serializers import CartSerializer, TransactionSerializer
import razorpay
from ReSource import settings
from datetime import datetime, timedelta
from django.http import HttpResponse
import pdfkit
import pandas as pd
from PIL import Image, ImageFont, ImageDraw
from io import BytesIO
from django.core.files import File
from ReSource.utils import Check
import requests
from PlaceOrder.models import UserPlan

# from semantic_text_similarity.models import WebBertSimilarity
import numpy as np

razorpay_client = razorpay.Client(auth=(settings.razorpay_id , settings.razorpay_account_id))

from importlib.resources import Resource
from datetime import datetime
# from ResourceApp.models import *
import numpy as np
import pandas as pd
from apyori import apriori


def create_dict(record):
    output = {}
    # # count = 1
    #     for ele in record:
    #         val = list(ele.items)
    #         output[count] = val
    #         count+=1
        
    for ele in record:
        ords = list(ele.items)
        # for i in range(len(ords)):
        #     for j in range(len(ords)):
        #         if i!=j:
        if ords[0] in output:
            output[ords[0]].append(ords[1])
        else:
            output[ords[0]] = [ords[1]]
        
        if ords[1] in output:
            output[ords[1]].append(ords[0])
        else:
            output[ords[1]] = [ords[0]]
    
    with open('records.json' , 'w') as file:
        json.dump(output , file)

@csrf_exempt
def resource_recommend(request):
    if request.method == 'GET':
        resource = {}
        resources  = Resources.objects.all()
        n = len(resources)
        for i in range(n):
            resource[resources[i].id] = i
        print(resource)
        orders = Order.objects.all()

        bucket = []
        for order in orders:
            print("order_id :", order.id)
            products = ProductInOrder.objects.filter(order_id = order.id)
            ele = [0]*n
            print("products length :", len(products))
            for j in range(len(products)):
                try:
                    idx = resource[products[j].resource.id]
                    ele[idx] = products[j].resource.id
                    print("Resource_id :" , products[j].resource.id)
                    #print("Ele added : ", ele)
                except:
                    continue
            bucket.append(ele)
        
        print(bucket)
        association_rules = apriori(bucket , min_support = 0.20, min_confidence = 0.5, min_lift = 1.2 , min_length = 2)
        association_results = list(association_rules)
        print(association_results)
        create_dict(association_results)
        return JsonResponse(data = {
            'status':200,
            'message':'Similar resources created'
        })



# @csrf_exempt
# def add_students(request , id):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         cid = data['id']
#         cart = Cart.objects.get(id = cid)

#         if id != cart.workforce:
#             return JsonResponse('It is not your cart' , safe = False)

#         cart.visitors = data['file']
#         serializer = CartSerializer(cart)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(data = {
#                 'status':200,
#                 'message': 'Data saved success fully',
#                 'data': serializer.data
#             })
#         else:
#             return JsonResponse('Invalid Data' , safe = False)
    
#     # else:

        



    #     if role_id!=4 or role_id!=5:
    #         return JsonResponse('Access not allowed' , safe = False)
    #     items = Cart.objects.filter(workforce = id)
    #     dates = {}
    #     for ele in items:
    #         try:
    #             dates[ele.date].append(Institutes.objects.get(id = ele.seller))
    #         except:
    #             dates[ele.date] = [Institutes.objects.get(id = ele.seller)]
    #     return JsonResponse(data = {
    #         'status' : 200,
    #         'message': 'dates fetched',
    #         'data'   : dates
    #     })

    # else:
    #     data = json.loads(request.body)
    #     items = Cart.objects.filter(workforce = id)
    #     elements = [f'{ele.seller}/{ele.date}' for ele in items]
    #     for ele in elements:
    #         # add in db

# @csrf_exempt
# def generateicard(request, id):
#     if request.method == 'post':
#         data = json.loads(request.body())
#         order_id = data['order_id']
#         products = ProductInOrder.objects.filter(order = order_id)
#         for p in products:
#             visitor = p.visitor
#             url = 'http://8000/institute/profile/id/role'
#             qrcode_img = qrcode.make(url)
#             canvas = Image.new('RGB' , (300, 300) , 'white')
#             draw = ImageDraw.Draw(canvas)
#             canvas.paste(qrcode_img)
#             canvas.save('id_card.png')
#             # canvas.close()
#             # buffer = BytesIO()
#             # canvas.sasve(buffer , 'PNG')

# def generate_card():
#     print("Hellooooo")
#     # logo_file = "myqr.png"
#     # logoIm = Image.open(logo_file)
#     # im = Image.open("2.jpeg")
#     # logoIm = logoIm.resize((350, 350))
#     # logoWidth, logoHeight = logoIm.size
#     # print(logoWidth, logoHeight)
#     # im.paste(logoIm, (610, 120))
#     # im.save(os.path.join("qr.jpg"))

#     im = Image.open("qr.jpg")
#     draw = ImageDraw.Draw(im)

#     extra_bold = ImageFont.truetype('Raleway-ExtraBold.ttf', size=45)
#     black = ImageFont.truetype('Raleway-Black.ttf', size=25)
#     light = ImageFont.truetype('Raleway-Light.ttf', size=20)

#     (x, y) = (50, 90)
#     message = "ID - CARD"
#     color = 'rgb(58,175,169)'
#     draw.text((x, y), message, fill=color, font=extra_bold)

#     (x, y) = (50, 170)
#     name = 'Student - '+"Riya Ingale"
#     color = 'rgb(23,37,40)'
#     draw.text((x, y), name, fill=color, font=black)

#     (x, y) = (50, 250)
#     name = 'Mobile - '+"8692931133"
#     color = 'rgb(23,37,40)'
#     draw.text((x, y), name, fill=color, font=light)
#     (x, y) = (50, 300)
#     resource = 'Resource - '+"Resource"
#     color = 'rgb(23,37,40)'
#     draw.text((x, y), resource, fill=color, font=light)
#     (x, y) = (50, 350)
#     resource = 'Lab - '+"Lab Name"
#     color = 'rgb(23,37,40)'
#     draw.text((x, y), resource, fill=color, font=light)
#     (x, y) = (50, 400)
#     resource = 'Slot - '+"Start Time - End Time"
#     color = 'rgb(23,37,40)'
#     draw.text((x, y), resource, fill=color, font=light)
#     im.save('greeting_card.png')
#     return "ID CARD saved"

# generate_card()

def send_mail(mail, subj, body):
	url = 'https://prod-23.centralus.logic.azure.com/workflows/d7697b6b72694b37bcd28fe4f12ae001/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dtiC7QiKn8BMJIPzLF-Oo35FGEpCaB6Zpuu2PNFDAuE'
	myobj = {'email': mail, 'subject': subj, 'body':body}
	x = requests.post(url, json = myobj)


@csrf_exempt
def addstudents(request, order_id):
    try:
        token = request.headers['Authorization']
    except:
        return JsonResponse(data = {
            'status':401,
            'message':'Unauthorized Acces, Please login'
        })
    
    if request.method == "POST":
        data = json.loads(request.body)
        ids = data['ids']
        info = {}
        info['resource'] = data['resource']
        info['lab'] = data['lab']
        info['start_time'] = data['start_time']
        info['end_time'] = data['end_time']
        info['date'] = data['date']
        info['workforce'] = data['workforce']
        for ele in ids:
            info['email'] = ele['email']
            info['name'] = ele['name']
            # generate_card()
            try:
                mail = info['email']
                subj = "Re-Source - Lab Access ID CARD"
                body = """Here is your ID Card to Acess while you visit the institute.\n\n
Student Name - {0}\n
Email - {1}\n
Resource - {2}\n
Lab - {3}\n
Date - {4}\n
Slot - {5} - {6}\n
                """.format(info['name'], info['email'], info['resource'], info['lab'], info['date'],info['start_time'], info['end_time'])
                print(body)
                send_mail(mail, subj, body)
            except:
                return JsonResponse(
                    data = {
                        'status':404,
                        'message':"Email not sent"
                    }
                )
        return JsonResponse(data  = {
            'status': 200,
            'message': "ID card generated"
        })
    else:
        order = Order.objects.get(id = order_id)
        if order.payment_status!=1 :
            return JsonResponse(data = {
                'status':200,
                'message':"Payment pending"
            })
        products = ProductInOrder.objects.filter(order_id = order_id)
        additional_details = {}
        for prod in products:
            additional_details['resource_name'] = prod.resource.name
            additional_details['lab_name'] = prod.resource.lab.name
            additional_details['workforce_name'] = prod.workforce.name
            additional_details['institute_name'] = prod.workforce.institute.name
        return JsonResponse(data = {
            'status':200,
            'message': 'Data Fetched',
            'data': products.data,
            'additional_data':additional_details
        })
                       
        

@csrf_exempt
def requesttopay(request):
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
    user_id = info['user_id']

    if request.method == "POST":
        user = WorkForce.objects.get(id = user_id)
        items = Cart.objects.filter(workforce = user_id, is_approved = 1).all()
        final_price = 0
        if len(items)>0:
            order = Order.objects.create(finalcost = final_price, workforce = user, institute = user.institute)
            sell_univ = {}
            for item in items:
                product_in_order = ProductInOrder.objects.create(workforce = item.workforce,
                buyer_institute = item.buyer_institute, seller_institute = item.seller_institute,
                resource = item.resource, units = item.units, date = item.date,
                start_time = item.start_time, end_time = item.end_time, cost = item.cost, order_id = order.id)
                product_in_order.save()

                cost = item.resource.cost * item.units
                final_price += cost
                count = 0
                if item.seller_institute in sell_univ:
                    sell_univ[item.seller_institute]['id'].append(product_in_order)
                    sell_univ[item.seller_institute]['cost']+=cost
                else:
                    count+=1
                    sell_univ[item.seller_institute] = {'id': [product_in_order] , 'cost': cost}
                # item.is_approved = 2
                item.delete()
            add_cost = 0
            # for key, value in sell_univ.items():
            #     add_cost += value['cost'] * 1.18 * 0.02
      

            service_charges = 0.18
            order.finalcost = (final_price * (1 + service_charges)* (1.02 + 0.02*count))


            print(order.finalcost)
            
            order.save()

            # Cart.query.filter_by(is_approved__in = [-1,2] ).delete()
            return JsonResponse(data={
                "message":"Order has been sent to the Accounts to Pay",
                "status":200
            })
        else:
            return JsonResponse(data={
                "message":"No Items in Cart which are approved and not already sent in the order",
                "status":404
            })

@csrf_exempt
def payment(request):
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
    user_id = info['user_id']
    role_id = info['role_id']

    if request.method == 'POST':
        data = json.loads(request.body)
        order_id = data['order_id']
        order = Order.objects.get(id = order_id)
        user = order.workforce
        if order:
            order_currency = 'INR'

            print(order.finalcost)

            callback_url = 'http://'+ str(get_current_site(request))+'/handlerequest/'
            print(callback_url)

            razorpay_order = razorpay_client.order.create(dict(
                amount = int(order.finalcost * 100), currency = order_currency,
                receipt = str(order.id), payment_capture = '1'))

            print(razorpay_order['id'])
            order.razorpay_order_id = razorpay_order['id']
            
            order.save()

            sell_univ = {}

            items = ProductInOrder.objects.filter(order_id= order_id).all()
            for item in items:
                cost = item.resource.cost * item.units
                count = 0
                if item.seller_institute in sell_univ:
                    sell_univ[item.seller_institute]['id'].append(item)
                    sell_univ[item.seller_institute]['cost']+=cost
                else:
                    count+=1
                    sell_univ[item.seller_institute] = {'id': [item] , 'cost': cost}

            now = datetime.now()
            date_time = now.strftime('%m%YODR%H%M')
            count = 0
            for key,value in sell_univ.items():
                transaction = Transaction.objects.create(order = order,
                tid = date_time+str(count), buyer = user.institute.id,
                # seller = Institutes.objects.get(id = key), finalcost = value['cost'] * 1.02 + order.finalcost * 0.02),
                seller = Institutes.objects.get(id = key), finalcost = value['cost'])
                # transaction.order_items.add(*value['id'])
                transaction.save()
            
            return JsonResponse(data = {
            "key": str(settings.razorpay_id),"amount":int(order.finalcost*100), "currency": "INR", "name": "Re-Source Resources", "description": "Test Transaction","amount_paid": 0,"amount_due":int(order.finalcost*100), "order_id": razorpay_order['id'], "entity": "order",
            "receipt": razorpay_order['id'], "status": "created", "attempts": 0, "notes": [],
            "callback_url": callback_url,
            "prefill": { "name": user.name,"email": user.email_id,"contact": "+91" + str(user.phone_no)},
            "theme": {"color": "#2BA977"}})
        else:
            return JsonResponse(data = {
                "message":"No such Order",
                "status":404
            })

@csrf_exempt
def paymentold(request):
    print('HERE')
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data['user_id']
        # role = data['Role']
        user = WorkForce.objects.get(id = user_id)
        items = Cart.objects.filter(workforce = user_id)
        final_price = 0
        if len(items)>0:
            order = Order.objects.create(finalcost = final_price, workforce = user)
            sell_univ = {}
            for item in items:
                product_in_order = ProductInOrder.objects.create(workforce = item.workforce,
                buyer_institute = item.buyer_institute, seller_institute = item.seller_institute,
                resource = item.resource, units = item.units, date = item.date,
                start_time = item.start_time, end_time = item.end_time, cost = item.cost, order_id = order.id)

                product_in_order.save()

                # order.order_items.add(product_in_order)

                cost = item.resource.cost * item.units
                final_price += cost
                count = 0
                if item.seller_institute in sell_univ:
                    sell_univ[item.seller_institute]['id'].append(product_in_order)
                    sell_univ[item.seller_institute]['cost']+=cost
                else:
                    count+=1
                    sell_univ[item.seller_institute] = {'id': [product_in_order] , 'cost': cost}
            
            add_cost = 0
            for key, value in sell_univ.items():
                add_cost += value['cost'] * 1.18 * 0.02

                    
            gst_percent = 0.18
            order.finalcost = ((final_price * (1 + gst_percent)) + add_cost) * 1.02041
            order_currency = 'INR'

            print(order.finalcost)

            callback_url = 'http://'+ str(get_current_site(request))+'/handlerequest/'
            print(callback_url)

            razorpay_order = razorpay_client.order.create(dict(
                amount = int(order.finalcost * 100), currency = order_currency,
                receipt = str(order.id), payment_capture = '1'))

            print(razorpay_order['id'])
            order.razorpay_order_id = razorpay_order['id']
            order.request_status=  1 
            order.save()
            now = datetime.now()
            date_time = now.strftime('%m%YODR%H%M')
            count = 0
            for key,value in sell_univ.items():
                transaction = Transaction.objects.create(order = order,
                tid = date_time+str(count), buyer = user.institute.id,
                # seller = Institutes.objects.get(id = key), finalcost = value['cost'] * 1.02 + order.finalcost * 0.02),
                seller = Institutes.objects.get(id = key), finalcost = value['cost']*1.18)
                # transaction.order_items.add(*value['id'])
                transaction.save()
            
            # return render(request, r'C:\Users\SARVESH GAONKAR\Desktop\Resource_v3\Re-Source\PlaceOrder\templates\paymentsummaryrazorpay.html', {'order_id':razorpay_order['id'] , 'orderId':order.id, 'final_price':order.finalcost,
            # 'razorpay_merchant_id':settings.razorpay_id, 'callback_url':callback_url })
            # return JsonResponse(data = {'order_id':razorpay_order['id'] , 'orderId':order.id, 'final_price':order.finalcost,'razorpay_merchant_id':settings.razorpay_id, 'callback_url':callback_url })
            return JsonResponse(data = {
            "key": str(settings.razorpay_id),"amount":int(order.finalcost*100), "currency": "INR", "name": "Re-Source Resources", "description": "Test Transaction","amount_paid": 0,"amount_due":int(order.finalcost*100), "order_id": razorpay_order['id'], "entity": "order",
            "receipt": razorpay_order['id'],
            "status": "created",
            "attempts": 0,
            "notes": [],
            "callback_url": callback_url,
            "prefill": { "name": user.name,"email": user.email_id,"contact": "+91" + str(user.phone_no)},
            "theme": {"color": "#2BA977"}})
        else:
            return JsonResponse('No elements in cart' , safe = False)    

@csrf_exempt
def handlerequest(request):
    if request.method == 'POST':
        try:
            print("HEELOO??")
            payment_id = request.POST.get('razorpay_payment_id', '')
            order_id = request.POST.get('razorpay_order_id','')
            signature = request.POST.get('razorpay_signature','')
            # print("Body - ",request.body)
            # print("Data - ",request.data)
            # data = json.loads(request.body)
            # payment_id = data['razorpay_payment_id']
            # order_id = data['razorpay_order_id']
            # signature = data['razorpay_signature']
            params_dict = { 
            'razorpay_order_id': order_id, 
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
            }
            print(params_dict)
        except:
            return HttpResponse('Data not received')
        try:
            order = Order.objects.get(razorpay_order_id = order_id)
        except:
            return JsonResponse(data = {
                'status':'505',
                'message':'order not found'
            })
        order.razorpay_payment_id = payment_id
        order.razorpay_signature = signature
        
        try:
            util = razorpay.Utility(razorpay_client)
            util.verify_payment_signature(params_dict)
            order.payment_status = 1
            order.request_status +=1
        except:
            order.payment_status = -1
            order.save()
            print('paymentfailed')
            return HttpResponse('Payment Failed')
        # result = razorpay_client.utility.verify_payment_signature(params_dict)
        # amount = order.finalcost * 100
        # razorpay_client.payment.capture(payment_id , amount)
        
        order.save()
        if order.request_status == 11:
            plandb = UserPlan.objects.get(id = order.id)
            plandb.is_active = True
            plandb.start_date = datetime.now()
            if plandb.plan_id == 1:
                plandb.end_date = datetime.now()+timedelta(days = 30)
            elif plandb.plan_id == 2:
                plandb.end_date = datetime.now()+timedelta(days = 90)
            else:
                plandb.end_date = datetime.now()+timedelta(days = 180)
            plandb.save()

        else:
            items = ProductInOrder.objects.filter(order_id = order.id).all()
            for item in items:
                start_time = item.start_time
                start_time = start_time.strftime("%H:%M:%S")
                end_time = item.end_time
                end_time = end_time.strftime("%H:%M:%S")
                db = Book_slots(resource = item.resource, date = item.date, start_time = start_time[0:2] , end_time = end_time[0:2], lab = item.resource.lab.id, units = item.units, approved = 1)
                db.save()
        print('PaymentDone')
            ## send emails to students and students
    
        data = {
            "message": "PAYMENT DONE",
            'order_id': order.id,
            'transaction_id': order.razorpay_payment_id,
            'amount': order.finalcost,
            "status":200
        }
        return JsonResponse(data = data)
                
                #========sending invoice via email===============
                # result = BytesIO()
                # pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
                #, link_callback=fetch_resources)
                # pdf = result.getvalue()
                # filename = 'Invoice_' + data['order_id'] + '.pdf'

                # mail_subject = 'Recent Order Details'
                # # message = render_to_string('firstapp/payment/emailinvoice.html', {
                # #     'user': order_db.user,
                # #     'order': order_db
                # # })
                # context_dict = {
                #     'user': order_db.user,
                #     'order': order_db
                # }
                # template = get_template('firstapp/payment/emailinvoice.html')
                # message  = template.render(context_dict)
                # to_email = order_db.user.email
                # # email = EmailMessage(
                # #     mail_subject,
                # #     message, 
                # #     settings.EMAIL_HOST_USER,
                # #     [to_email]
                # # )

                # # for including css(only inline css works) in mail and remove autoescape off
                # email = EmailMultiAlternatives(
                #     mail_subject,
                #     "hello",       # necessary to pass some message here
                #     settings.EMAIL_HOST_USER,
                #     [to_email]
                # )
                # email.attach_alternative(message, "text/html")
                # email.attach(filename, pdf, 'application/pdf')
                # email.send(fail_silently=False)

                # return render('path/paymentsuccess.html' , data)
        
            #return render(paymentfailed.html)
    
        # return JsonResponse('1 st try hit, Error in retrieving')

@csrf_exempt
def settle_transaction(request):
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
    user_id = info['user_id']
    role_id = info['role_id']
    
    if request.method == "POST":
        #authenticate role_id from jwt
        data = json.loads(request.body)
        transaction_id = data['tid']
        try:
            transaction = Transaction.objects.get(id = transaction_id)   
        except:
            return JsonResponse('Transaction doesnot exist')

        transaction.is_paid = 1
        transaction.save()

        return JsonResponse(data = {
            'status': 200,
            'message':'Money will be credited',
        })

@csrf_exempt
def invoice(request, order_id):
    if request.method == "GET":
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
        products = ProductInOrder.objects.filter(order_id = order_id).all()
        order = Order.objects.get(id = order_id, payment_status = 1)
        template = get_template("invoice.html")
        html = template.render({'order':order, 'products':products})
        options = {
            'page-size': 'Letter',
            'encoding': "UTF-8",
        }
        pdf = pdfkit.from_string(html, False, options)
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="pperson_list_pdf.pdf"'
        return response    


def pay_resource_plan(request, plan_id):
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
    user_id = info['user_id']
    role_id = info['role_id']
    db = UserPlan(plan_id = plan_id, )


@csrf_exempt
def buyplan(request):
    try:
        token = request.headers['Authorization']

    except:
        return JsonResponse(data= {
            "message":"Unauthorized Access, Please Login",
            "status":401
        })
    
    info = Check.check_auth(token)
    if info['status']==0:
        return JsonResponse(data = {
            'status':401,
            'message':"Unauthorized Access, Please Login"
        })
    user_id = info['user_id']
    role_id = info['role_id']
    if request.method == "POST":
    
        if role_id not in [4,5]:
            return JsonResponse(data = {
                'status': 401,
                'message': "This role has no access"
            })
        data = json.loads(request.body)
        r_id = data['r_id']
        cost = data['cost']
        plan_id = data['plan_id']
        if plan_id == 1:
            cost*=9.136
        elif plan_id == 2:
            cost*=64.26
        else:
            cost*=82.24
        workforce = WorkForce.objects.get(id = user_id)
        db = Order.objects.create(workforce = workforce , 
        institute = workforce.institute, finalcost = cost, request_status = 10 )

        plandb = UserPlan.objects.create(
        order_id = db.id,
        plan_id = plan_id ,# 1 for monthly, 2 for 3 months and 3 for 6 months
        is_active = False,
        resource_id = Resources.objects.get(id = r_id),
        user_id = workforce,
        cost = cost)
        plandb.save()
        db.save()
        return JsonResponse(data = {
            'status':200,
            'message':"Plan order created"
        })