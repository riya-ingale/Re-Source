from django.urls import path
from ResourceApp import views

urlpatterns = [
    path('allres/<page_num>',views.getresources,name= "getResources"),
    path('add/<username>/<lab_id>',views.addresources, name = 'addResources'),
    path('getdetails/<r_id>',views.getdetails,name = "getDetails"),
    path('edit/<id>' , views.resource_edit, name = "editResource"),
    # path('edit_resource/<id>' , views.resource_edit)
    path('addslots/', views.addslots),
    path('cart/<user_id>', views.cart, name = "viewCart")
    # path('add/<lab_id>',views.addresources, name = 'addResources')
    # path('getsearchedresources',views.getsearchedresources,name='getSearchedResources')
]
