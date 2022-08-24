from django.urls import path
from Institutes import views

urlpatterns = [
    path('profile/' , views.profile),
    path('profile/edit/' , views.editprofile),
    path('pendingrequests/<id>/<role_id>' , views.allrequests),

    # path('institute_request/<id>' , views.institution_requests),
    path('workforce_profile/<r_num>/<l_num>' , views.workforce_profile),
    path('institute_profile/<r_num>/<l_num>' , views.institute_proflie),

    path('resource_addrequest/', views.resource_addrequest),
    path('resource_rentapproval/' , views.resource_rentapproval),
    path('resource_editrequests/', views.resource_editrequests, name = "resource_editrequests"),


    path('workforce_requests/', views.workforce_requests, name = "workforceRequests"),
    path('lab_requests/', views.lab_requests, name = "LabRequests"),
    path('institute_requests/', views.institute_requests, name = "institute_requests"),
    path('university_requests/', views.university_requests, name = "university_requests"),

    path('addstaff/' , views.add_ugcstaff),

    path('get_university/<page_num>', views.get_university, name  ="get_university"), # All University Page

    path("view_allinstitutes/<page_num>",views.view_allinstitutes, name= "view_allinstitutes"),
    path("view_institute/<user_id>/<l_num>/<r_num>", views.view_institute, name = "view_institute"),
    path('view_university/<user_id>', views.view_university, name = "view_university"),
    path('view_labAssitant/<user_id>', views.view_labAssitant, name = "view_labAssitant"),
    path('download/<type>/<filename>', views.DownloadPDF, name='download_pdf'),
]