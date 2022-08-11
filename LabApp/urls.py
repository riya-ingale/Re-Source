from django.urls import path
from LabApp import views

urlpatterns = [
    path('add/' , views.addlab,name = 'addLab'),
    path('edit/<id>' , views.edit_lab )
]