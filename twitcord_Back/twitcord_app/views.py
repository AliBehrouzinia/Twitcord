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

    def post(self, request, *args, **kwargs):
        data = self.request.data
        if not data.get('content'):
            return HttpResponseBadRequest("content is required.")
        tweet = self.create_tweet(data)
        return Response( data = serializers.TweetSerializer(tweet).data, status=status.HTTP_200_OK)
    
    def create_tweet(self,data):
        data['user'] = self.request.user.id
        serializer = serializers.TweetSerializer(data= data, many=False)
        if serializer.is_valid(True):
            tweet = serializer.save()
            return tweet
        return None
