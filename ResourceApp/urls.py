from django.urls import path
from ResourceApp import views

urlpatterns = [
    path('',views.getresources,name= "getResources"),
    path('add/<lab_id>',views.addresources, name = 'addResources')
    # path('getsearchedresources',views.getsearchedresources,name='getSearchedResources')
]
