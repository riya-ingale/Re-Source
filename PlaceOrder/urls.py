from django.urls import path
from PlaceOrder import views

urlpatterns = [
    path('payment/' , views.payment),
    path('handlerequest/' , views.handlerequest)
]