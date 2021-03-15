from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import NotFound

from .models import *
from .models import BegardUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = twitcordUser
        fields = 'email'


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = twitcordUser
        fields = ('email', 'pk', 'profile_img')
        read_only_fields = ('email',)