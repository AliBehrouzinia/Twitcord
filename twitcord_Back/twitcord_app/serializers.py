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
        fields = ('email', 'pk')
        read_only_fields = ('email',)


class ProfileDetailsViewSerializer(serializers.ModelSerializer):
    profile_img_upload_details = serializers.SerializerMethodField()
    header_img_upload_details = serializers.SerializerMethodField()

    def to_representation(self, instance):
        result = super(ProfileDetailsViewSerializer, self).to_representation(instance)
        result['followings_count'] = UserFollowing.objects.filter(user_id=instance.id).count()
        result['followers_count'] = UserFollowing.objects.filter(following_user_id=instance.id).count()
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
        if instance_user == request_user.id:
            result['status'] = "self"
        elif instance_user in queryset2:
            result['status'] = "pending"
        elif instance_user in queryset1:
            result['status'] = "following"
        else:
            result['status'] = "not following"
        return result

    class Meta:
        model = TwitcordUser
        fields = ('email', 'username', 'is_active', 'date_joined', 'first_name', 'last_name', 'birth_date', 'bio',
                  'website', 'is_public', 'has_profile_img', 'profile_img', 'profile_img_upload_details',
                  'has_header_img', 'header_img', 'header_img_upload_details')
        read_only_fields = ('email', 'profile_img', 'profile_img_upload_details',
                            'header_img', 'header_img_upload_details')

    def get_profile_img_upload_details(self, obj):
        if self.context['request'].user.id == obj.id:
            return obj.profile_img_upload_details
        else:
            return None

    def get_header_img_upload_details(self, obj):
        if self.context['request'].user.id == obj.id:
            return obj.header_img_upload_details
        else:
            return None


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['id', 'content', 'create_date']
        read_only_fields = ['id', 'create_date']
        extra_kwargs = {
            'content': {'required': True}
        }

    def to_representation(self, instance):
        result = super(TweetSerializer, self).to_representation(instance)
        user = instance.user
        is_liked = Like.objects.filter(user_id=self.context['request'].user.id, tweet=instance.id).exists()
        is_retweeted = Tweet.objects.filter(id=instance.id, user_id=self.context['request'].user.id,
                                            retweet_from__isnull=False).exists()
        result['is_retweeted'] = is_retweeted
        result['is_liked'] = is_liked
        result['user_id'] = user.id
        result['id'] = instance.id
        result['username'] = user.username
        result['first_name'] = user.first_name
        result['last_name'] = user.last_name
        result['is_public'] = user.is_public
        result['like_count'] = len(Like.objects.filter(tweet_id=instance.id))
        result['reply_count'] = len(Tweet.objects.filter(parent_id=instance.id))
        result['retweet_count'] = len(Tweet.objects.filter(retweet_from_id=instance.id))
        return result


class FollowingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowRequest
        fields = '__all__'


class FollowersRequestsSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        result = super(FollowersRequestsSerializer, self).to_representation(instance)
        from_user = instance.request_from
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
        fields = ['id', 'username', 'first_name', 'last_name', 'is_public', 'email', 'bio']

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
    retweet_from = TweetSerializer(read_only=True)
    parent = TweetSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = '__all__'

    def to_representation(self, instance):
        result = super(GlobalTweetSearchSerializer, self).to_representation(instance)
        user = instance.user
        is_liked = Like.objects.filter(user_id=self.context['request'].user.id, tweet=instance.id).exists()
        is_retweeted = Tweet.objects.filter(id=instance.id, user_id=self.context['request'].user.id,
                                            retweet_from__isnull=False).exists()
        result['is_retweeted'] = is_retweeted
        result['is_liked'] = is_liked
        result['user_id'] = result.pop('user')
        result['id'] = instance.id
        result['username'] = user.username
        result['first_name'] = user.first_name
        result['last_name'] = user.last_name
        result['is_public'] = user.is_public
        result['like_count'] = len(Like.objects.filter(tweet_id=instance.id))
        result['reply_count'] = len(Tweet.objects.filter(parent_id=instance.id))
        result['retweet_count'] = len(Tweet.objects.filter(retweet_from_id=instance.id))
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


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

    def to_representation(self, instance):
        result = super(RoomSerializer, self).to_representation(instance)
        users = result.pop('users')
        owner = result.pop('owner')
        result['owner'] = {}
        admin = TwitcordUser.objects.filter(id=owner)
        admin_object = admin[0]
        result['owner']['id'] = admin_object.id
        result['owner']['first_name'] = admin_object.first_name
        result['owner']['last_name'] = admin_object.last_name
        result['owner']['username'] = admin_object.username
        result['members'] = {}
        if users is not None:
            counter = 1
            for item in users:
                user = TwitcordUser.objects.filter(id=item)
                main_user = user[0]
                result['members'][counter] = {}
                result['members'][counter]['id'] = main_user.id
                result['members'][counter]['first_name'] = main_user.first_name
                result['members'][counter]['last_name'] = main_user.last_name
                result['members'][counter]['username'] = main_user.username
                counter += 1
        values = result['members'].values()
        result['members'] = list(values)
        return result


class ReplySerializer(serializers.ModelSerializer):
    is_reply = serializers.BooleanField()
    parent = serializers.PrimaryKeyRelatedField(queryset=Tweet.objects.all())
    retweet_from = TweetSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = '__all__'

    def to_internal_value(self, data):
        data['user'] = self.context['request'].user.id
        data['is_reply'] = True
        return super().to_internal_value(data)

    def to_representation(self, instance):
        result = super(ReplySerializer, self).to_representation(instance)
        is_liked = Like.objects.filter(user_id=self.context['request'].user.id, tweet=instance.id).exists()
        is_retweeted = Tweet.objects.filter(id=instance.id, user_id=self.context['request'].user.id,
                                            retweet_from__isnull=False).exists()
        result['is_retweeted'] = is_retweeted
        result['is_liked'] = is_liked
        result['like_count'] = len(Like.objects.filter(tweet_id=instance.id))
        result['reply_count'] = len(Tweet.objects.filter(parent_id=instance.id))
        result['retweet_count'] = len(Tweet.objects.filter(retweet_from_id=instance.id))
        return result


class ShowReplySerializer(serializers.ModelSerializer):
    parent = TweetSerializer(read_only=True)
    retweet_from = TweetSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'parent', 'retweet_from']

    def to_representation(self, instance):
        result = super(ShowReplySerializer, self).to_representation(instance)
        request_user = self.context['request'].user.id
        likes = Like.objects.filter(user=request_user)
        liked_tweets = []
        for item in likes:
            temp = Tweet.objects.filter(id=item.tweet.id)
            liked_tweets.append(temp)
            for temp in liked_tweets:
                if parent == temp[0]:
                    result['parent_is_liked'] = True
                    break
            else:
                result['parent_is_liked'] = False
        result['id'] = result.pop('id')
        result['is_reply'] = instance.is_reply
        result['content'] = instance.content
        result['create_date'] = serializers.DateTimeField().to_representation(instance.create_date)
        is_retweeted = Tweet.objects.filter(id=instance.id, user_id=self.context['request'].user.id,
                                            retweet_from__isnull=False).exists()
        result['is_retweeted'] = is_retweeted
        for item in liked_tweets:
            if instance == item[0]:
                result['is_liked'] = True
                break
        else:
            result['is_liked'] = False
        result['user_id'] = instance.user.id
        result['username'] = instance.user.username
        result['email'] = instance.user.email
        result['first_name'] = instance.user.first_name
        result['last_name'] = instance.user.last_name
        result['is_public'] = instance.user.is_public
        result['like_count'] = len(Like.objects.filter(tweet_id=instance.id))
        result['reply_count'] = len(Tweet.objects.filter(parent_id=instance.id))
        result['retweet_count'] = len(Tweet.objects.filter(retweet_from_id=instance.id))

        tweets = Tweet.objects.filter(parent_id=instance.id)
        result['children'] = {}
        counter = 1
        if tweets is not None:
            for item in tweets:
                result['children'][counter] = {}
                result['children'][counter]['id'] = item.id
                result['children'][counter]['is_reply'] = item.is_reply
                result['children'][counter]['content'] = item.content
                result['children'][counter]['create_date'] = serializers.DateTimeField().to_representation(item.
                                                                                                           create_date)
                result['children'][counter]['parent'] = item.parent.id
                if item.retweet_from is not None:
                    result['children'][counter]['retweet_from'] = item.retweet_from.id
                is_retweeted = Tweet.objects.filter(id=item.id, user_id=self.context['request'].user.id,
                                                    retweet_from__isnull=False).exists()
                result['is_retweeted'] = is_retweeted
                for i in liked_tweets:
                    if item == i[0]:
                        result['children'][counter]['is_liked'] = True
                        break
                else:
                    result['children'][counter]['is_liked'] = False
                result['children'][counter]['user_id'] = item.user.id
                result['children'][counter]['username'] = item.user.username
                result['children'][counter]['first_name'] = item.user.first_name
                result['children'][counter]['last_name'] = item.user.last_name
                result['children'][counter]['is_public'] = item.user.is_public
                result['children'][counter]['like_count'] = len(Like.objects.filter(tweet_id=item.id))
                result['children'][counter]['reply_count'] = len(Tweet.objects.filter(parent_id=item.id))
                result['children'][counter]['retweet_count'] = len(Tweet.objects.filter(retweet_from_id=item.id))
                counter += 1
        values = result['children'].values()
        result['children'] = list(values)
        return result
