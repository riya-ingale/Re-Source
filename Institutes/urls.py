from django.urls import path
from Institutes import views

urlpatterns = [
    path('proflie/<username>' , views.profile),
]