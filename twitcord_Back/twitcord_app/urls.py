from django.urls import path, re_path

from . import views
from allauth.account.views import confirm_email


urlpatterns = [
    path('profile/<int:id>/header/', views.ProfileDetailsView.as_view()),
    path('tweets/', views.TweetsListCreateView.as_view()),
    path('tweets/<int:id>/', views.TweetsListCreateView.as_view()),
    re_path('accounts-rest/registration/account-confirm-email/(?P<key>.+)/', confirm_email,
            name='account_confirm_email'),
    path('followings/', views.ListOfFollowingsView.as_view()),
    path('followers/', views.ListOfFollowersView.as_view()),
    path('followings/<int:id>/', views.EditFollowingsView.as_view()),
    path('followings/requests/', views.FollowingRequestView.as_view()),
    path('followings/requests/<int:id>/', views.DeleteFollowRequestView.as_view()),
    path('followers/requests/', views.FollowersRequestsView.as_view()),
    path('followers/requests/<int:id>/', views.AnswerFollowRequestView.as_view()),
    path('like/tweet/<int:id>/', views.LikeCreateView.as_view()),
    path('users/like/tweet/<int:id>/', views.UsersLikedTweetListView.as_view()),
    path('tweets/like/user/<int:id>/', views.TweetsLikedListView.as_view())
]
