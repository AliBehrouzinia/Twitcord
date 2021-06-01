# Generated by Django 3.1.7 on 2021-06-01 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitcord_app', '0018_auto_20210601_1726'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='twitcorduser',
            name='profile_img',
        ),
        migrations.AddField(
            model_name='twitcorduser',
            name='has_header_img',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='twitcorduser',
            name='has_profile_img',
            field=models.BooleanField(default=False),
        ),
    ]
