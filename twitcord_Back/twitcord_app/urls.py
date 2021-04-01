from django.urls import path
from . import views

urlpatterns = [
    path('profile/<int:id>/header/', views.ProfileDetailsView.as_view())
]
