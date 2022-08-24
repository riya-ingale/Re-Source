from django.urls import path
from LabApp import views

urlpatterns = [
    path('add/' , views.addlab,name = 'addLab'),
    path('edit/<lab_id>' , views.edit_lab , name= "editLab"),
    path('all/<page_num>' , views.getlabs, name = 'viewAllLabs'),
    path('view/<lab_id>/<num>' , views.getdetails, name = 'viewLabDetails'),
]