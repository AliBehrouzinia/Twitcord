from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import NotFound

from .models import *
from .models import TwitcordUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwitcordUser
        fields = 'email'


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwitcordUser
        fields = ('email', 'pk', 'profile_img')
        read_only_fields = ('email',)


class ProfileDetailsViewSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        result = super(ProfileDetailsViewSerializer, self).to_representation(instance)
        result['followings_count'] = UserFollowing.objects.filter(user_id=instance.id).count()
        result['followers_count'] = UserFollowing.objects.filter(following_user_id=instance.id).count()
        return result

    class Meta:
        model = TwitcordUser
        fields = ('email', 'username', 'profile_img', 'is_active', 'date_joined','first_name', 'last_name', 'birth_date', 'bio', 'website', 'is_public')
        read_only_fields = ('email', )


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = '__all__'

    def to_internal_value(self, data):
        data['user'] = self.context['request'].user.id
        return super().to_internal_value(data)


class FollowingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowRequest
        fields = '__all__'


class FollowersRequestsSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        result = super(FollowersRequestsSerializer, self).to_representation(instance)
        from_user = instance.request_from
        result['profile_img'] = from_user.profile_img.url
        result['username'] = from_user.email
        return result

    class Meta:
        model = FollowRequest
        fields = ['id', 'request_from', 'date']


class FollowingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = '__all__'


class ListOfFollowingsSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        result = super(ListOfFollowingsSerializer, self).to_representation(instance)
        user = instance.following_user_id
        result['id'] = result.pop('following_user')
        result['profile_img'] = user.profile_img.url
        result['username'] = user.email
        return result

    class Meta:
        model = UserFollowing
        fields = ['following_user']


class ListOfFollowersSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        result = super(ListOfFollowersSerializer, self).to_representation(instance)
        user = instance.user_id
        result['id'] = result.pop('user')
        result['profile_img'] = user.profile_img.url
        result['username'] = user.email
        return result

    class Meta:
        model = UserFollowing
        fields = ['user']


class TimeLineSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        result = super(TimeLineSerializer, self).to_representation(instance)
        user = instance.user
        result['id'] = result.pop('user')
        result['profile_img'] = user.profile_img.url
        result['username'] = user.username
        result['first_name'] = user.first_name
        return result

    class Meta:
        model = Tweet
        fields = '__all__'
