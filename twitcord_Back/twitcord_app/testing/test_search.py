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
from django.test import Client

from django.utils import timezone


class SearchUserTest(APITestCase):

    def test_search_users(self):
        twitcord_user = get_user_model()
        self.user = twitcord_user.objects.create(email='mmd@gmail.com', username='test', password='test_pass')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        url = '/search/user/?query=t'
        response = self.client.get(url, content_type='application/json', accept='application/json')
        self.maxDiff = None
        data = {
            "count": 1,
            "next": None,
            "previous": None,
            "results": {
                "id": 31,
                "username": "test",
                "first_name": None,
                "last_name": None,
                "is_public": True,
                "email": "mmd@gmail.com",
                "bio": None,
                "status": "not following"
            }
        }
        result = response.data
        result = dict(result)
        result['results'] = dict(result['results'][0])
        self.assertEqual(data, result)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class SeachTweetTest(APITestCase):

    def setUp(self):
        twitcord_user = get_user_model()
        self.user = twitcord_user.objects.create(email='test@gmail.com', username='test', password='test_pass')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.tweets = models.Tweet.objects.bulk_create([
            models.Tweet(content='Hi from there', user=self.user),
            models.Tweet(content='Goodbye', user=self.user)
        ])

    def test_search_tweet(self):
        url = '/search/tweet/?query=t'
        response = self.client.get(url, content_type='application/json')
        data = {
            "count": 1,
            "next": None,
            "previous": None,
            "results":
                {
                    "id": 30,
                    "is_reply": False,
                    "content": "Hi from there",
                    "create_date": response.data['results'][0]['create_date'],
                    "parent": None,
                    "has_media": False,
                    "retweet_from": None,
                    "is_liked": False,
                    "username": "test",
                    "first_name": None,
                    "last_name": None,
                    "is_public": True
                }
        }
        result = response.data
        result = dict(result)
        result['results'] = dict(result['results'][0])
        self.assertEqual(result, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
