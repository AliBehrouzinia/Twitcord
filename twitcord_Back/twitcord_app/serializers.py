from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import NotFound

from .models import *
from .models import BegardUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = twitcordUser
        fields = 'email'