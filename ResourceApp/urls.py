from django.urls import path
from ResourceApp import views

urlpatterns = [
    path('allres/<page_num>',views.getresources,name= "getResources"),
    path('add/<lab_id>',views.addresources, name = 'addResources'),
    path('getdetails/<r_id>',views.getdetails,name = "getDetails"),
    path('edit/<rid>' , views.resource_edit, name = "editResource"),
    # path('edit_resource/<id>' , views.resource_edit)
    path('addslots/', views.addslots),
    path('cart/', views.cart, name = "viewCart"),
    path('removeitem/', views.remove_item, name = "removeItem"),
    path('add_software/',views.add_software, name= "add_software")
    # path('add/<lab_id>',views.addresources, name = 'addResources')
    # path('getsearchedresources',views.getsearchedresources,name='getSearchedResources')
]