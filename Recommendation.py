from importlib.resources import Resource
import jwt
from ReSource import settings
from datetime import datetime
from ResourceApp.models import Order, ProductInOrder
from Institutes.models import *
import numpy as np
import pandas as pd
from apyori import apriori

class Check():
    def check_auth(token):
        try:
            info = jwt.decode(token , settings.SECRET_KEY , 'HS256', {'verify_signature': True})
            if info['exp'] < datetime.now().timestamp():
                info['status'] = 0
                return info
            else:
                info['status'] = 1
                return info

        except:
            info = {"status":0}
            return info
    
    def verify_token(token):
        try:
            info = jwt.decode(token , settings.SECRET_KEY , 'HS256', {'verify_signature': True})
        except:
            return False
        return True

class Recommendation():
    def resource_recommend():
        resource = {}
        resources  = Resource.objects.all()
        n = len(resources)
        for i in range(len(resources)):
            resource[resources[i].id] = i

        orders = Order.objects.all()

        bucket = []
        for order in orders:
            products = ProductInOrder.objects.filter(order_id = order.id)
            ele = [0]*len(n)
            for j in range(len(products)):
                idx = resource[products[i].resource.id]
                ele[idx] = products[i].resource.id
            bucket.append(ele)
        
        association_rules = apriori(bucket , min_support = 0.50, min_confidence = 0.7, min_lift = 1.2 , min_length = 2)
        association_results = list(association_rules)
        return association_results

print(Recommendation.resource_recommend())