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
import enum

from django.db.models import Q


class ProfileDetailsView(generics.RetrieveUpdateAPIView):
    """Get profile details of a user"""
    queryset = models.TwitcordUser.objects.all()
    permission_classes = [UserIsOwnerOrReadonly]
    serializer_class = serializers.ProfileDetailsViewSerializer
    lookup_url_kwarg = 'id'


class TweetsListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly,]
    serializer_class = serializers.TweetSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('id')
        return models.Tweet.objects.filter(user_id = user_id)


class ActionOnFollowRequestType(enum.Enum):
    accept = 1,
    reject = 2


class ListOfFollowingsView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.FollowingsSerializer

    def get_queryset(self):
        user = self.request.user.id
        return models.UserFollowing.objects.filter(user_id=user)


class ListOfFollowersView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.FollowingsSerializer

    def get_queryset(self):
        user = self.request.user.id
        queryset = models.UserFollowing.objects.filter(Q(following_user=user))
        return queryset


class EditFollowingsView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, *args, **kwargs):
        user_id = self.request.user.id
        following_user_id = self.kwargs.get('id')
        instance = get_object_or_404(models.UserFollowing, user_id=user_id, following_user=following_user_id)
        instance.delete()
        return Response()

    def patch(self, request, *args, **kwargs):
        user_id = self.request.user.id
        following_user_id = self.kwargs.get('id')
        instance = get_object_or_404(models.UserFollowing, user_id=user_id, following_user=following_user_id)
        

class FollowingRequestView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        data = self.request.data
        data['request_from'] = self.request.user.id

        if not (data.get('request_to') and isinstance(data['request_to'], int)):
            return HttpResponseBadRequest("field 'request_to' with a digit required.")

        if models.UserFollowing.objects.filter(user_id=data['request_from'],
                                               following_user_id=data['request_to']).exists():
            return HttpResponseBadRequest('this user is followed by you, you can not request to follow this user')

        request_to_user = get_object_or_404(models.TwitcordUser, id=data['request_to'])

        if request_to_user.is_public:
            follow_user_data = {"user_id": data['request_from'], "following_user_id": data['request_to']}
            serializer = serializers.FollowingsSerializer(data=follow_user_data)
            if serializer.is_valid(True):
                serializer.save()
                return Response(data={"status": "Followed", "follow_request_id": None},
                                status=status.HTTP_201_CREATED)
        else:
            serializer = serializers.FollowingRequestSerializer(data=data)
            if serializer.is_valid(True):
                follow_request = serializer.save()
                return Response(data={"status": "Requested", "follow_request_id": follow_request.id},
                                status=status.HTTP_201_CREATED)

        return Response(status.HTTP_406_NOT_ACCEPTABLE)


class FollowersRequestsView(generics.ListAPIView):
    """get list of followers requests"""
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.FollowersRequestsSerializer

    def get_queryset(self):
        user = self.request.user
        return models.FollowRequest.objects.filter(request_to=user)


class AnswerFollowRequestView(generics.UpdateAPIView):
    """Accept or reject a follow request"""
    permission_classes = [IsAuthenticated, AnswerFollowRequestPermission]

    def get_object(self):
        follow_request = get_object_or_404(models.FollowRequest, id=self.kwargs.get('id'))
        self.check_object_permissions(request=self.request, obj=follow_request)
        return follow_request

    def patch(self, request, *args, **kwargs):
        follow_request = self.get_object()

        action = self.request.query_params.get('action')

        if not ((action == ActionOnFollowRequestType.accept.name) or (action == ActionOnFollowRequestType.reject.name)):
            return HttpResponseBadRequest("error: problem in query params.")

        if action == ActionOnFollowRequestType.accept.name:
            data = {'user_id': follow_request.request_from_id, 'following_user_id': follow_request.request_to_id}
            serializer = serializers.FollowingsSerializer(data=data)
            if serializer.is_valid(True):
                serializer.save()

        follow_request.delete()
        return Response()


class DeleteFollowRequestView(generics.DestroyAPIView):
    """Delete a follow request"""
    permission_classes = [IsAuthenticated, DeleteFollowRequestPermission]

    def get_object(self):
        follow_request = get_object_or_404(models.FollowRequest, id=self.kwargs.get('id'))
        self.check_object_permissions(request=self.request, obj=follow_request)
        return follow_request
