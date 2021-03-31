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
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        target_user = get_object_or_404(models.TwitcordUser, id=self.kwargs.get('id'))
        data = dict()
        data['username'] = target_user.email
        data['profile_image'] = target_user.profile_img.url
        data['date_joined'] = target_user.date_joined
        data['is_public'] = target_user.is_public
        data['is_active'] = target_user.is_active
        data['tweets_count'] = 0

        return Response(data=data, status=status.HTTP_200_OK)
