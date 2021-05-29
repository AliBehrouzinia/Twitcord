from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import NotFound

from .models import *
from .models import TwitcordUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwitcordUser
        fields = 'email'


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwitcordUser
        fields = ('email', 'pk', 'profile_img')
        read_only_fields = ('email',)


class ProfileDetailsViewSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        result = super(ProfileDetailsViewSerializer, self).to_representation(instance)
        result['followings_count'] = UserFollowing.objects.filter(user_id=instance.id).count()
        result['followers_count'] = UserFollowing.objects.filter(following_user_id=instance.id).count()
        return result

    class Meta:
        model = TwitcordUser
        fields = ('email', 'username', 'profile_img', 'is_active', 'date_joined','first_name', 'last_name', 'birth_date', 'bio', 'website', 'is_public')
        read_only_fields = ('email', )


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = '__all__'

    def to_internal_value(self, data):
        data['user'] = self.context['request'].user.id
        return super().to_internal_value(data)


class FollowingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowRequest
        fields = '__all__'


class FollowersRequestsSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        result = super(FollowersRequestsSerializer, self).to_representation(instance)
        from_user = instance.request_from
        result['profile_img'] = from_user.profile_img.url
        result['username'] = from_user.username
        result['email'] = from_user.email
        result['first_name'] = from_user.first_name
        result['last_name'] = from_user.last_name
        result['is_public'] = from_user.is_public
        result['bio'] = from_user.bio
        return result

    class Meta:
        model = FollowRequest
        fields = ['id', 'request_from', 'date']


class FollowingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = '__all__'


class ListOfFollowingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = '__all__'

    def to_representation(self, instance):
        result = super(ListOfFollowingsSerializer, self).to_representation(instance)
        user = instance.following_user
        result['id'] = result.pop('following_user')
        result['profile_img'] = user.profile_img.url
        result['username'] = user.username
        result['email'] = user.email
        result['first_name'] = user.first_name
        result['last_name'] = user.last_name
        result['is_public'] = user.is_public
        return result


class ListOfFollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = '__all__'

    def to_representation(self, instance):
        result = super(ListOfFollowersSerializer, self).to_representation(instance)
        user = instance.user
        result['id'] = result.pop('user')
        result['profile_img'] = user.profile_img.url
        result['username'] = user.username
        result['email'] = user.email
        result['first_name'] = user.first_name
        result['last_name'] = user.last_name
        result['is_public'] = user.is_public
        return result


class FollowCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwitcordUser
        fields = ['pk']

    def to_representation(self, instance):
        result = super(FollowCountSerializer, self).to_representation(instance)
        user = instance.pk
        followings = UserFollowing.objects.filter(user_id=user).count()
        followers = UserFollowing.objects.filter(following_user_id=user).count()
        result['followers_count'] = followers
        result['followings_count'] = followings
        return result


class GlobalUserSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwitcordUser
        fields = ['id', 'username', 'first_name', 'last_name', 'is_public', 'profile_img', 'email', 'bio']

    def to_representation(self, instance):
        result = super(GlobalUserSearchSerializer, self).to_representation(instance)
        instance_user = instance.pk
        request_user = self.context['request'].user
        followings = UserFollowing.objects.filter(user_id=request_user.id)
        requests = FollowRequest.objects.filter(request_from=request_user.id)
        queryset1 = []
        for item in followings:
            queryset1.append(item.following_user.id)
        queryset2 = []
        for item in requests:
            queryset2.append(item.request_to.id)
        if instance_user in queryset2:
            result['status'] = "pending"
        elif instance_user in queryset1:
            result['status'] = "following"
        else:
            result['status'] = "not following"
        return result


class GlobalTweetSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = '__all__'

    def to_representation(self, instance):
        result = super(GlobalTweetSearchSerializer, self).to_representation(instance)
        user = instance.user
        result['id'] = result.pop('user')
        result['profile_img'] = user.profile_img.url
        result['username'] = user.username
        result['first_name'] = user.first_name
        result['last_name'] = user.last_name
        result['is_public'] = user.is_public
        return result


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

    def to_internal_value(self, data):
        data['user'] = self.context['request'].user.id
        data['tweet'] = self.context['tweet_id']
        return super().to_internal_value(data)


class UsersLikedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

    def to_representation(self, instance):
        result = super().to_representation(instance)
        result['email'] = instance.user.email
        result['username'] = instance.user.username
        result['first_name'] = instance.user.first_name
        result['last_name'] = instance.user.last_name
        return result


class TweetsLikedListSerializer(serializers.ModelSerializer):
    tweet = TweetSerializer(read_only=True)

    class Meta:
        model = Like
        fields = '__all__'


class ReplySerializer(serializers.ModelSerializer):
    is_reply = serializers.BooleanField()
    parent = serializers.PrimaryKeyRelatedField(queryset=Tweet.objects.all())

    class Meta:
        model = Tweet
        fields = '__all__'

    def to_internal_value(self, data):
        data['user'] = self.context['request'].user.id
        data['is_reply'] = True
        return super().to_internal_value(data)


class ShowReplySerializer(serializers.ModelSerializer):

    class Meta:
        model = Tweet
        fields = ['id']

    def to_representation(self, instance):
        result = super(ShowReplySerializer, self).to_representation(instance)
        result['parent_id'] = instance.parent.id
        parent_set = Tweet.objects.filter(id=instance.parent.id)
        if len(parent_set) != 0:
            parent = parent_set[0]
            result['parent_content'] = parent.content
            result['parent_create_date'] = parent.create_date
            result['parent_user_is_public'] = parent.user.is_public
            result['parent_user_username'] = parent.user.username
            result['parent_user_email'] = parent.user.email
            result['parent_user_firstname'] = parent.user.first_name
            result['parent_user_lastname'] = parent.user.last_name
            result['parent_user_email'] = parent.user.email
        result['tweet_id'] = instance.id
        result['tweet_content'] = instance.content
        result['tweet_create_date'] = instance.create_date
        result['tweet_user_is_public'] = instance.user.is_public
        result['tweet_user_username'] = instance.user.username
        result['tweet_user_email'] = instance.user.email
        result['tweet_user_firstname'] = instance.user.first_name
        result['tweet_user_lastname'] = instance.user.last_name
        result['tweet_user_email'] = instance.user.email
        tweets = Tweet.objects.filter(parent_id=instance.id)
        result['children'] = {}
        counter = 1
        if tweets is not None:
            for item in tweets:
                result['children'][counter] = {}
                result['children'][counter]['id'] = item.id
                result['children'][counter]['username'] = item.user.username
                result['children'][counter]['email'] = item.user.email
                result['children'][counter]['first_name'] = item.user.first_name
                result['children'][counter]['last_name'] = item.user.last_name
                result['children'][counter]['is_public'] = item.user.is_public
                result['children'][counter]['content'] = item.content
                result['children'][counter]['create_date'] = item.create_date
                counter += 1
        result.pop('id')
        values = result['children'].values()
        result['children'] = list(values)
        return result
