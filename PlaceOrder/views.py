from django.views.decorators.csrf import csrf_exempt
import json
from django.http.response import JsonResponse
from ResourceApp.models import *
from Institutes.models import *
from django.contrib.sites.shortcuts import get_current_site
from ResourceApp.serializers import CartSerializer, TransactionSerializer
import razorpay
from ReSource import settings
from datetime import datetime
from django.http import HttpResponse
import pandas as pd
import qrcode
from PIL import Image, ImageDraw
from io import BytesIO
from django.core.files import File


razorpay_client = razorpay.Client(auth=(settings.razorpay_id , settings.razorpay_account_id))


@csrf_exempt
def add_students(request , id):
    if request.method == 'POST':
    
        data = json.loads(request.body)
        cid = data['id']
        cart = Cart.objects.get(id = cid)

        if id != cart.workforce:
            return JsonResponse('It is not your cart' , safe = False)

        cart.visitors = data['file']
        serializer = CartSerializer(cart)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(data = {
                'status':200,
                'message': 'Data saved success fully',
                'data': serializer.data
            })
        else:
            return JsonResponse('Invalid Data' , safe = False)
    
    # else:

        



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


@csrf_exempt
def requesttopay(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data['user_id']

        user = WorkForce.objects.get(id = user_id)
        items = Cart.objects.filter(workforce = user_id, is_approved = 1)
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
                item.is_approved = 2
                item.save()
            add_cost = 0
            for key, value in sell_univ.items():
                add_cost += value['cost'] * 1.18 * 0.02
      
            gst_percent = 0.18
            order.finalcost = ((final_price * (1 + gst_percent)) + add_cost) * 1.02041

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
    print('HERE')
    if request.method == 'POST':
        data = json.loads(request.body)
        order_id = data['order_id']
        # role = data['Role']
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
            order.request_status=  1 
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
                seller = Institutes.objects.get(id = key), finalcost = value['cost']*1.18)
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
        except:
            order.payment_status = -1
            order.save()
            print('paymentfailed')
            return HttpResponse('Payment Failed')
        # result = razorpay_client.utility.verify_payment_signature(params_dict)
        # amount = order.finalcost * 100
        # razorpay_client.payment.capture(payment_id , amount)
        order.payment_status = 1
        order.save()
        print('PaymentDone')
            ## send emails to students
    
        data = {
            "message": "PAYMENT DONE",
            'order_id': order.id,
            'transaction_id': order.razorpay_payment_id,
            'amount': order.finalcost
        }
                
                #========sending invoice via email===============
                # result = BytesIO()
                # pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)#, link_callback=fetch_resources)
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
        return HttpResponse(data)
        
    
            #return render(paymentfailed.html)
    
        # return JsonResponse('1 st try hit, Error in retrieving')

@csrf_exempt
def settle_transaction(request):
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


    





        
