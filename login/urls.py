from django.urls import path
from login import views

urlpatterns = [
    path('signup/<int:id>',views.signup),
    path('register/<int:id>',views.register)
    # path('email/',views.send_mail_after_registration)
]
