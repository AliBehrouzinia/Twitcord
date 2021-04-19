from django.shortcuts import render, get_object_or_404
from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from . import models, serializers
from allauth.account.views import ConfirmEmailView
from django.contrib.auth import get_user_model
from django.http import HttpResponseBadRequest, Http404
from rest_framework.response import Response
from rest_framework.permissions import *
from .permissions import *
import datetime
from allauth.account.views import ConfirmEmailView
from django.contrib.auth import get_user_model


class ProfileDetailsView(generics.RetrieveAPIView):
    """Get profile details of a user"""
    queryset = models.TwitcordUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = serializers.ProfileDetailsViewSerializer
    lookup_url_kwarg = 'id'


class TweetsView(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly,]
    serializer_class = serializers.TweetSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('id')
        return models.Tweet.objects.filter(user_id = user_id)


class TweetsView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = serializers.TweetSerializer


class UpdateTwitcordUserView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated, UserIsOwnerOrReadonly]
    queryset = models.TwitcordUser.objects.all()
    lookup_field = 'id'
    serializer_class = serializers.CustomUserDetailsSerializer
