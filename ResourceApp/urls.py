from django.urls import path
from ResourceApp import views

urlpatterns = [
    path('',views.getresources,name= "getResources"),
# <<<<<<< HEAD
    path('add/<username>',views.addresources, name = 'addResources'),
# =======
    # path('add/<lab_id>',views.addresources, name = 'addResources')
    # path('getsearchedresources',views.getsearchedresources,name='getSearchedResources')
# >>>>>>> 8495d0bea87d6462f0860acfbdc48e38fc290c28
]
