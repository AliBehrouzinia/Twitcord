from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import twitcordUser


class twitcordUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm):
        model = twitcordUser
        fields = ('email',)


class twitcordUserChangeForm(UserChangeForm):

    class Meta:
        model = twitcordUser
        fields = ('email',)
