from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from . import models, serializers
from django.http import HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
import datetime


# Create your views here.

class ProfileDetailsView(generics.RetrieveAPIView):
    """Get profile details of a user"""
    queryset = models.TwitcordUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = serializers.ProfileDetailsViewSerializer
    lookup_url_kwarg = 'id'

class TweetsView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = serializers.TweetSerializer
