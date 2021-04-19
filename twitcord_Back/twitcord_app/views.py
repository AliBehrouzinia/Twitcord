from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from . import models, serializers
from allauth.account.views import ConfirmEmailView
from django.contrib.auth import get_user_model
from django.http import HttpResponseBadRequest, Http404
from rest_framework.response import Response
from .permissions import *
import datetime
from allauth.account.views import ConfirmEmailView
from django.contrib.auth import get_user_model


# Create your views here.


class TweetsView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = serializers.TweetSerializer


class UpdateTwitcordUserView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated, UserIsOwnerOrReadonly]
    queryset = models.TwitcordUser.objects.all()
    lookup_field = 'id'
    serializer_class = serializers.CustomUserDetailsSerializer



