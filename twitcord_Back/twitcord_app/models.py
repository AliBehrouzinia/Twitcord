from django.db import models
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
    profile_img = models.ImageField(default='profiles/defaults/user-profile-image.jpg', upload_to='profiles', null=True)
    username = models.TextField(max_length=15)
    is_admin = True
    first_name = models.CharField(null=True, max_length=50)
    last_name = models.CharField(null=True, max_length=50)
    bio = models.TextField(null=True, max_length=160)
    birth_date = models.DateTimeField(null=True)
    website = models.URLField(null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = TwitcordUserManager()

    def __str__(self):
        return self.email

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
    user = models.ForeignKey(TwitcordUser, on_delete=models.CASCADE)
    content = models.TextField(max_length=280)
    create_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.content


class UserFollowing(models.Model):
    user_id = models.ForeignKey("TwitcordUser", related_name="following", on_delete=models.CASCADE)
    following_user_id = models.ForeignKey("TwitcordUser", related_name="followers", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user_id", "following_user_id")
        ordering = ["-created"]


class FollowRequest(models.Model):
    request_from = models.ForeignKey(TwitcordUser, related_name="request_from", on_delete=models.CASCADE)
    request_to = models.ForeignKey(TwitcordUser, related_name="request_to", on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("request_from", "request_to")
        ordering = ['-date']
