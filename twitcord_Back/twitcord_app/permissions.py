from rest_framework import permissions


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
