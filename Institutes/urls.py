from django.urls import path
from Institutes import views

urlpatterns = [
    path('profile/<id>/<role_id>' , views.profile),
    path('profile/edit/<id>/<role_id>' , views.editprofile),
    path('pendingrequests/<id>' , views.allrequests),
    path('institute_request/<id>' , views.institution_request),
    path('workforce_profile/<id>/<r_num>/<l_num>' , views.workforce_profile),
    path('institute_profile/<id>/<r_num>/<l_num>' , views.institute_proflie),
    path('resource_request/<id>', views.resource_request),
    path('resource_approval/<id>' , views.resource_approval),
    
    path('workforce_requests/<user_id>', views.workforce_requests, name = "workforceRequests"),
    path('lab_requests/<user_id>', views.lab_requests, name = "LabRequests")
]