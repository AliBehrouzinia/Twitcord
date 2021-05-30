from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from .. import models

from ..models import Tweet, Like


class LikeTest(APITestCase):
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

    def test_like(self):
        url = '/like/tweet/{}/'.format(self.tweet.id)
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = {
            "id": 1,
            "date": response.data['date'],
            "user": 28,
            "tweet": 1
        }
        self.assertEqual(response.data, data)

        url = '/users/like/tweet/{}/'.format(self.tweet.id)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data['results']), 1)
