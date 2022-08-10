from django.urls import path
from Institutes import views

urlpatterns = [
    path('profile/<id>' , views.profile),
    path('profile/edit/<id>' , views.editprofile),
    path('pendingrequests/<id>' , views.allrequests),
    path('institute_request/<id>' , views.institution_request),
    path('workforce_request/<id>' , views.workforce_request),
    path('lab_request/<id>' , views.lab_request)
]