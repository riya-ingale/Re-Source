from django.urls import path
from LabApp import views

urlpatterns = [
    path('add/' , views.addlab,name = 'addLab'),
    path('edit/<user_id>/<lab_id>' , views.edit_lab , name= "editLab")
]