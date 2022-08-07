from django.urls import path
from ResourceApp import views

urlpatterns = [
    path('',views.getresources,name= "getResources"),
    path('add/<username>',views.addresources, name = 'addResources'),
]
