from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from .. import models

from ..models import Tweet, Like
from rest_framework import serializers


class TimelineTest(APITestCase):
    def setUp(self):
        twitcord_user = get_user_model()
        self.user1 = twitcord_user.objects.create(username='test1', email='test1@gmail.com', password='testpass')
        self.user2 = twitcord_user.objects.create(username='test2', email='test2@gmail.com', password='testpass')
        self.user3 = twitcord_user.objects.create(username='test3', email='test3@gmail.com', password='testpass')
        self.user4 = twitcord_user.objects.create(username='test4', email='test4@gmail.com', password='testpass')
        self.token = Token.objects.create(user=self.user1)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        self.tweet1 = models.Tweet.objects.create(user=self.user1, content='test1')
        self.tweet2 = models.Tweet.objects.create(user=self.user2, content='test2')
        self.tweet3 = models.Tweet.objects.create(user=self.user3, content='test3')
        self.tweet4 = models.Tweet.objects.create(user=self.user4, content='test4')

        models.UserFollowing.objects.bulk_create([
            models.UserFollowing(user_id=self.user1.id, following_user=self.user2),
            models.UserFollowing(user_id=self.user2.id, following_user=self.user3)
        ])

    def test_timeline(self):
        url = '/timeline/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = {
            "count": 1,
            "next": None,
            "previous": None,
            "results": [
                {
                    "id": 2,
                    "is_reply": False,
                    "content": "test2",
                    "create_date": serializers.DateTimeField().to_representation(self.tweet2.create_date),
                    "parent": None,
                    "retweet_from": None,
                    "is_liked": False,
                    "user_id": 2,
                    "username": "test2",
                    "first_name": None
                }
            ]
        }
        result = response.data
        result = dict(result)
        result['results'] = dict(result['results'][0])
        print(response.data)
        print(data)
        self.assertEqual(response.data, data)
