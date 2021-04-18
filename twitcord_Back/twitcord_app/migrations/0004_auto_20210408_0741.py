# Generated by Django 3.1.7 on 2021-04-08 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitcord_app', '0003_tweet_create_date_default'),
    ]

    operations = [
        migrations.AddField(
            model_name='twitcorduser',
            name='bio',
            field=models.TextField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='twitcorduser',
            name='username',
            field=models.TextField(max_length=50),
        ),
    ]
