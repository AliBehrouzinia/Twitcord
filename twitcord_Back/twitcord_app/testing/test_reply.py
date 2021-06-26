from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from .. import models

from ..models import Tweet, Like
from rest_framework import serializers


class ReplyTest(APITestCase):
    """
    Ensure we can get list of followings.
    Ensure we can unfollow a user.
    """

    def setUp(self):
        twitcord_user = get_user_model()
        self.user = twitcord_user.objects.create(username='test', email='test@gmail.com', password='testpass')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.tweet = models.Tweet.objects.create(user=self.user, content='salam')

        self.user1 = twitcord_user.objects.create(username='test1', email='test1@gmail.com', password='testpass')
        self.user2 = twitcord_user.objects.create(username='test2', email='test2@gmail.com', password='testpass')
        self.user3 = twitcord_user.objects.create(username='test3', email='test3@gmail.com', password='testpass')

    def test_reply(self):

        url = '/reply/'
        self.maxDiff = None
        data = {
            "content": "reply1",
            "parent": self.tweet.id
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        create_date = serializers.DateTimeField().to_representation(response.data['create_date'])

        response_data = {
            "id": 2,
            "is_reply": True,
            "parent": 1,
            "content": "reply1",
            "create_date": create_date,
            "retweet_from": None,
            "user": 1
        }
        self.assertEqual(response.data, response_data)

        self.assertEqual(len(models.Tweet.objects.filter(parent=self.tweet.id)), 1)

        url = '/replys/{}/'.format(self.tweet.id)
        response = self.client.get(url)
        data = {
            "count": 1,
            "next": None,
            "previous": None,
            "results":
                {
                    "id": 2,
                    "is_reply": True,
                    "parent": 1,
                    "content": "reply1",
                    "create_date": create_date,
                    "retweet_from": None,
                    "user": self.user.id
                }
        }

        result = response.data
        result = dict(result)
        result['results'] = dict(result['results'][0])
        self.assertEqual(result, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
