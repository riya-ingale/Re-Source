from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('resource/',include('ResourceApp.urls')),
    path('api/',include('login.urls')),
    path('institute/', include('Institutes.urls')),
    path('lab/', include('LabApp.urls')),
    path('placeorder/', include('PlaceOrder.urls'))
]
