# Generated by Django 3.1.7 on 2021-04-16 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitcord_app', '0006_auto_20210416_1817'),
    ]

    operations = [
        migrations.AlterField(
            model_name='twitcorduser',
            name='bio',
            field=models.TextField(max_length=76, null=True),
        ),
    ]
