from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from . import models, serializers
from django.http import HttpResponseBadRequest
from rest_framework.response import Response
from .permissions import *
import datetime


# Create your views here.

class TweetsView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = serializers.TweetSerializer

class UpdateTwitcordUserView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated, UserIsOwnerOrReadonly]
    queryset = models.TwitcordUser.objects.all()
    lookup_field = 'id'
    serializer_class = serializers.CustomUserDetailsSerializer



