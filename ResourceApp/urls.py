from django.urls import path
from ResourceApp import views

urlpatterns = [
    path('',views.getresources,name= "getResources"),
    path('add',views.addresources, name = 'addResources')
]
