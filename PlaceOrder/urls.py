from django.urls import path
from PlaceOrder import views

urlpatterns = [
    path('payment/' , views.payment),
    path('handlerequest/' , views.handlerequest),
    path("requesttopay/", views.requesttopay),
    path('sellerpay/' , views.settle_transaction),
    path('basket/' , views.resource_recommend),
    path('invoice/<order_id>', views.invoice),
    path('addstudents/<order_id>',views.addstudents),
    path('buyplan/', views.buyplan)
]