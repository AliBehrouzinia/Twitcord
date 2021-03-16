from __future__ import unicode_literals
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import TwitcordUserCreationForm, TwitcordUserChangeForm
from .models import *


class TwitcordUserAdmin(UserAdmin):
    add_form = TwitcordUserCreationForm
    form = TwitcordUserChangeForm
    model = TwitcordUser
    list_display = ('email', 'date_joined', 'profile_img')
    list_filter = ('email', 'date_joined')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('date_joined', 'is_public', 'profile_img')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(TwitcordUser, TwitcordUserAdmin)
