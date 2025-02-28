from django.urls import path
from .views import SignupView, GetUserView, DeleteUserView, UpdateUserView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('', GetUserView.as_view(), name='get_user'),
    path('get-token', obtain_auth_token),
    path('signup', SignupView.as_view(), name='signup'),
    path('delete', DeleteUserView.as_view(), name='delete'),
    path('update', UpdateUserView.as_view(), name='update')
    # login path, contains delete and update methods
]