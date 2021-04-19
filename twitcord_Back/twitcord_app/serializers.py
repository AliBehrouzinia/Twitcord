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
    class Meta:
        model = TwitcordUser
        fields = ('email', 'username', 'profile_img', 'is_active', 'is_public', 'date_joined')
class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = '__all__'

    def to_internal_value(self, data):
        data['user'] = self.context['request'].user.id
        return super().to_internal_value(data)
