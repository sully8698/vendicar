from django.urls import path
from .views import SignupView, GetUserView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('', GetUserView.as_view(), name='get_user'),
    path('get-token', obtain_auth_token),
    path('signup', SignupView.as_view(), name='signup')
]