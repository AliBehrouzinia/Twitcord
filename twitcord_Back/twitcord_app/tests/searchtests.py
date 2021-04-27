import json
import datetime
from datetime import datetime
from email import header
import base64
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .. import serializers
from .. import models
from ..models import *
from django.test import Client

from django.utils import timezone


class FollowersRequestTest(APITestCase):
    """
    Ensure we can get list of followers requests.
    Ensure we can answer followers requests.
    """
    def setUp(self):
        twitcord_user = get_user_model()
        self.user = twitcord_user.objects.create(email='test@gmail.com', username='test', password='test_pass')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        self.follower_user_1 = twitcord_user.objects.create(email='follower1@gmail.com', username='mmd1',
                                                            password='follower1pass')
        self.follower_user_2 = twitcord_user.objects.create(email='follower2@gmail.com', username='mmd2',
                                                            password='follower2pass')
        # self.follow_requests = models.FollowRequest.objects.bulk_create([
        #     models.FollowRequest(request_from=self.follower_user_1, request_to=self.user),
        #     models.FollowRequest(request_from=self.follower_user_2, request_to=self.user)
        # ])

    def test_search_users(self):
        url = "/search/user/?query=mmd1"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
