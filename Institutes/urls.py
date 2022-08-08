from django.urls import path
from Institutes import views

urlpatterns = [
    path('profile/<username>' , views.profile),
    path('profile/edit/<username>' , views.editprofile)
]