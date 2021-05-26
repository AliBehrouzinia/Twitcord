from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from .. import models

from ..models import TwitcordUser


class LoginTestCase(APITestCase):

    def setUp(self):
        twitcord_user = get_user_model()
        self.user = twitcord_user.objects.create(username='test', email='test@gmail.com', password='testpass')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_login(self):
        data = {
            "email": "mmd@gmail.com",
            "password": "test_pass"
        }
        response = self.client.post("/rest-auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
