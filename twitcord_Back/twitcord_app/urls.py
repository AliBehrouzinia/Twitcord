from django.urls import path, re_path

from . import views
from allauth.account.views import confirm_email


urlpatterns = [
    path('tweets/', views.TweetsView.as_view()),
    path('profile/<int:id>/', views.UpdateTwitcordUserView.as_view()),
    re_path('accounts-rest/registration/account-confirm-email/(?P<key>.+)/', confirm_email,
            name='account_confirm_email'),
]
