from rest_framework import permissions
from . import models
from django.shortcuts import get_object_or_404


class UserIsOwnerOrReadonly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id


class DeleteFollowRequestPermission(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.request_from == request.user


class AnswerFollowRequestPermission(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.request_to == request.user


class PrivateAccountTweetPermission(permissions.BasePermission):
    message = "You can't access the private account you are not following."

    def has_permission(self, request, view):
        tweet_id = view.kwargs.get('id')
        user = request.user
        tweet = get_object_or_404(models.Tweet, id=tweet_id)

        if tweet.user.is_public:
            return True

        if tweet.user == user:
            return True

        if models.UserFollowing.objects.filter(user=user, following_user=tweet.user).exists():
            return True

        return False
