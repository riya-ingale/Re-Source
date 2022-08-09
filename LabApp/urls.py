from django.urls import path
from LabApp import views

urlpatterns = [
    path('add/' , views.addlab,name = 'addLab')
]