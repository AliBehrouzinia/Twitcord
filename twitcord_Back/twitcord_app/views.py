from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from . import models, serializers
from django.http import HttpResponseBadRequest
from rest_framework.response import Response
import datetime

# Create your views here.

class TweetsView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = serializers.TweetSerializer
