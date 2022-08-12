from django.urls import path
from ResourceApp import views

urlpatterns = [
    path('',views.getresources,name= "getResources"),
    path('add/<username>/<lab_id>',views.addresources, name = 'addResources'),
    path('getdetails/<r_id>',views.getdetails,name = "getDetails"),
<<<<<<< HEAD
    path('edit/<id>' , views.resource_edit)
=======
>>>>>>> abbd675d485b4187626ad0a402e397900bd2874a
    # path('edit_resource/<id>' , views.resource_edit)
    # path('addslots/', views.addslots)
    # path('add/<lab_id>',views.addresources, name = 'addResources')
    # path('getsearchedresources',views.getsearchedresources,name='getSearchedResources')
]
