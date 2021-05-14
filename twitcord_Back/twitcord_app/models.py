from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .managers import TwitcordUserManager


class TwitcordUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_public = models.BooleanField(default=True)
    username = models.TextField(max_length=15)
    is_admin = True
    first_name = models.CharField(null=True, max_length=50, blank=True)
    last_name = models.CharField(null=True, max_length=50, blank=True)
    bio = models.TextField(null=True, max_length=160, blank=True)
    birth_date = models.DateTimeField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)

    # Profile Image
    has_profile_img = models.BooleanField(default=False)
    PROFILE_IMG_DIRECTORY = f"profile_images"

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = TwitcordUserManager()

    def __str__(self):
        return self.email

    @property
    def profile_img_upload_details(self):
        bucket_name = settings.MEDIA_BUCKET_NAME
        directory = self.PROFILE_IMG_DIRECTORY
        name = f"profile_img_{self.id}.jpg"

        image = {
            'bucket_name': bucket_name,
            'object_name': f"{directory}/{name}"
        }
        return image

    @property
    def profile_img(self):
        download_host = 'http://localhost:9000'
        bucket_name = settings.MEDIA_BUCKET_NAME
        directory = self.PROFILE_IMG_DIRECTORY
        default_name = 'profile_img_default.jpg'
        name = f"profile_img_{self.id}.jpg" if self.has_profile_img else default_name

        url = f"{download_host}/{bucket_name}/{directory}/{name}"
        return url

    @property
    def is_superuser(self):
        return self.is_admin

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    @is_staff.setter
    def is_staff(self, value):
        self._is_staff = value


class Tweet(models.Model):
    parent = models.ForeignKey("Tweet", on_delete=models.CASCADE, default=None, null=True, blank=True)
    is_reply = models.BooleanField(default=False)
    user = models.ForeignKey(TwitcordUser, on_delete=models.CASCADE)
    content = models.TextField(max_length=280)
    create_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.content


class UserFollowing(models.Model):
    following_TYPES = [
        ('family', 'family'),
        ('friend', 'friend'),
        ('close friend', 'close friend'),
        ('celebrity', 'celebrity'),
        ('unfamiliar person', 'unfamiliar person'),
    ]
    type = models.CharField(max_length=30, choices=following_TYPES, default='unfamiliar person')
    user = models.ForeignKey("TwitcordUser", related_name="following", on_delete=models.CASCADE)
    following_user = models.ForeignKey("TwitcordUser", related_name="followers", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "following_user")
        ordering = ["-created"]


class FollowRequest(models.Model):
    request_from = models.ForeignKey(TwitcordUser, related_name="request_from", on_delete=models.CASCADE)
    request_to = models.ForeignKey(TwitcordUser, related_name="request_to", on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("request_from", "request_to")
        ordering = ['-date']


class Like(models.Model):
    user = models.ForeignKey(TwitcordUser, on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "tweet")
