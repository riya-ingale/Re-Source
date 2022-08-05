import string
import random

def home(request):
    letters = string.ascii_lowercase
    length = [6,7,8,9,10]
    no = '1234556789'
    city_state = [('Mumbai', 'Maharashtra'), ('Pune','Maharashtra') , ('Banglore' , 'Karanataka'), ('Jaipur' , 'Rajasthan')]
    
    for i in range(5):
        username = "".join(random.choice(letters) for j in range(random.choice(length)))
        password = "".join(random.choice(letters) for j in range(8))
        city , state = random.choice(city_state)
        phone_no = no
        email = ''.join(random.choice(letters) for j in range(4)) + '@gmail.com'
        db = Institutes(name =  username, password = password, email= email, phone_no = phone_no,  role_id = 1  , city = city , state = state)
        db.save()