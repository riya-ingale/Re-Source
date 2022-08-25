from importlib.resources import Resource
import jwt
from ReSource import settings
from datetime import datetime
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

