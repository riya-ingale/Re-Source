from django.urls import path
from Institutes import views

urlpatterns = [
    path('profile/<id>/<role_id>' , views.profile),
    path('profile/edit/<id>/<role_id>' , views.editprofile),
    path('pendingrequests/<id>/<role_id>' , views.allrequests),

    path('institute_request/<id>' , views.institution_requests),
    path('workforce_profile/<id>/<r_num>/<l_num>' , views.workforce_profile),
    path('institute_profile/<id>/<r_num>/<l_num>' , views.institute_proflie),

    path('resource_addrequest/<id>', views.resource_addrequest),
    path('resource_rentapproval/<id>' , views.resource_rentapproval),
    path('resource_editrequests/<user_id>', views.resource_editrequests, name = "resource_editrequests"),

    path('workforce_requests/<user_id>', views.workforce_requests, name = "workforceRequests"),
    path('lab_requests/<user_id>', views.lab_requests, name = "LabRequests"),
    path('institute_requests/<user_id>', views.institute_requests, name = "institute_requests"),

    path('addstaff/' , views.add_ugcstaff),

    path('get_university/<page_num>', views.get_university, name  ="get_university")
]