from django.conf.urls import url
from django.urls import path

from . import views
from allauth.account.views import confirm_email


urlpatterns = [
    path('tweets/', views.TweetsView.as_view()),
    url(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email,
        name='account_confirm_email'),
]
