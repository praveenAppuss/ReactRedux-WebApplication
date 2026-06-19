from django.urls import path
from .views import register, login,UserProfileView

urlpatterns = [
    path("register/", register),
    path("login/", login),
    path(
        "profile/",
        UserProfileView.as_view()
    ),
]