from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404

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
        result['id'] = instance.id
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
    user = ProfileDetailsViewSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'create_date', 'user']
        read_only_fields = ['id', 'create_date']
        extra_kwargs = {
            'content': {'required': True}
        }

    def to_representation(self, instance):
        result = super(TweetSerializer, self).to_representation(instance)
        is_liked = Like.objects.filter(user_id=self.context['request'].user.id, tweet=instance.id).exists()
        is_retweeted = Tweet.objects.filter(id=instance.id, user_id=self.context['request'].user.id,
                                            retweet_from__isnull=False).exists()
        result['is_retweeted'] = is_retweeted
        result['is_liked'] = is_liked
        result['id'] = instance.id
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
    user = ProfileDetailsViewSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = '__all__'

    def to_representation(self, instance):
        result = super(GlobalTweetSearchSerializer, self).to_representation(instance)
        is_liked = Like.objects.filter(user_id=self.context['request'].user.id, tweet=instance.id).exists()
        is_retweeted = Tweet.objects.filter(id=instance.id, user_id=self.context['request'].user.id,
                                            retweet_from__isnull=False).exists()
        result['is_retweeted'] = is_retweeted
        result['is_liked'] = is_liked
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


class TimeLineSerializer(serializers.ModelSerializer):
    parent = TweetSerializer(read_only=True)
    retweet_from = TweetSerializer(read_only=True)
    user = ProfileDetailsViewSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = '__all__'

    def to_representation(self, instance):
        result = super(TimeLineSerializer, self).to_representation(instance)
        is_liked = Like.objects.filter(user_id=self.context['request'].user.id, tweet=instance.id).exists()
        result['is_liked'] = is_liked
        result['id'] = instance.id
        result['like_count'] = len(Like.objects.filter(tweet_id=instance.id))
        result['reply_count'] = len(Tweet.objects.filter(parent_id=instance.id))
        result['retweet_count'] = len(Tweet.objects.filter(retweet_from_id=instance.id))
        return result


class RoomSerializer(serializers.ModelSerializer):
    owner = ProfileDetailsViewSerializer(read_only=True)
    users = ProfileDetailsViewSerializer(read_only=True, many=True)

    class Meta:
        model = Room
        fields = '__all__'

    def to_representation(self, instance):
        result = super(RoomSerializer, self).to_representation(instance)
        result['number_of_members'] = get_object_or_404(Room, id=instance.id).users.count() + 1
        return result


class ReplySerializer(serializers.ModelSerializer):
    is_reply = serializers.BooleanField()
    parent = serializers.PrimaryKeyRelatedField(queryset=Tweet.objects.all())
    retweet_from = TweetSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = '__all__'

    def to_representation(self, instance):
        result = super(TimeLineSerializer, self).to_representation(instance)
        user = instance.user
        is_liked = Like.objects.filter(user_id=self.context['request'].user.id, tweet=instance.id).exists()
        result['is_liked'] = is_liked
        result['id'] = instance.id
        result['user_id'] = result.pop('user')
        result['username'] = user.username
        result['first_name'] = user.first_name
        return result

    def to_internal_value(self, data):
        data['user'] = self.context['request'].user.id
        data['is_reply'] = True
        return super().to_internal_value(data)

    def to_representation(self, instance):
        result = super(ReplySerializer, self).to_representation(instance)
        is_liked = Like.objects.filter(user_id=self.context['request'].user.id, tweet=instance.id).exists()
        is_retweeted = Tweet.objects.filter(id=instance.id, user_id=self.context['request'].user.id,
                                            retweet_from__isnull=False).exists()
        parent = result.pop('parent')
        query = Tweet.objects.filter(pk=parent)
        if query is None:
            result['parent'] = None
        else:
            result['parent'] = {}
            for obj in query:
                result['parent']['id'] = obj.id
                result['parent']['content'] = obj.content
                result['parent']['create_date'] = obj.create_date
                is_liked = Like.objects.filter(user_id=self.context['request'].user.id, tweet=obj.id).exists()
                is_retweeted = Tweet.objects.filter(id=obj.id, user_id=self.context['request'].user.id,
                                                    retweet_from__isnull=False).exists()
                result['parent']['is_retweeted'] = is_retweeted
                result['parent']['is_liked'] = is_liked
                result['parent']['user_id'] = obj.user.id
                result['parent']['username'] = obj.user.username
                result['parent']['first_name'] = obj.user.first_name
                result['parent']['last_name'] = obj.user.last_name
                result['parent']['is_public'] = obj.user.is_public
                result['parent']['like_count'] = len(Like.objects.filter(tweet_id=obj.id))
                result['parent']['reply_count'] = len(Tweet.objects.filter(parent_id=obj.id))
                result['parent']['retweet_count'] = len(Tweet.objects.filter(retweet_from_id=obj.id))
        user_id = result.pop('user')
        user = get_object_or_404(TwitcordUser, pk=user_id)
        result['user'] = {}
        result['user']['username'] = user.username
        result['user']['date_joined'] = user.date_joined
        result['user']['first_name'] = user.first_name
        result['user']['last_name'] = user.last_name
        result['user']['birth_date'] = user.birth_date
        result['user']['is_public'] = user.is_public
        result['user']['profile_img'] = user.profile_img
        result['user']['header_img'] = user.header_img
        result['user']['id'] = user.id
        result['is_retweeted'] = is_retweeted
        result['is_liked'] = is_liked
        result['like_count'] = len(Like.objects.filter(tweet_id=instance.id))
        result['reply_count'] = len(Tweet.objects.filter(parent_id=instance.id))
        result['retweet_count'] = len(Tweet.objects.filter(retweet_from_id=instance.id))
        return result


class ShowReplySerializer(serializers.ModelSerializer):
    parent = TweetSerializer(read_only=True)
    retweet_from = TweetSerializer(read_only=True)
    user = ProfileDetailsViewSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'parent', 'retweet_from', 'user']

    def to_representation(self, instance):
        result = super(ShowReplySerializer, self).to_representation(instance)
        request_user = self.context['request'].user.id
        likes = Like.objects.filter(user=request_user)
        liked_tweets = []
        for item in likes:
            temp = Tweet.objects.filter(id=item.tweet.id)
            liked_tweets.append(temp)
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
                result['children'][counter]['user'] = {}
                result['children'][counter]['user']['username'] = item.user.username
                result['children'][counter]['user']['date_joined'] = item.user.date_joined
                result['children'][counter]['user']['first_name'] = item.user.first_name
                result['children'][counter]['user']['last_name'] = item.user.last_name
                result['children'][counter]['user']['birth_date'] = item.user.birth_date
                result['children'][counter]['user']['is_public'] = item.user.is_public
                result['children'][counter]['user']['profile_img'] = item.user.profile_img
                result['children'][counter]['user']['header_img'] = item.user.header_img
                result['children'][counter]['user']['id'] = item.user.id
                result['children'][counter]['like_count'] = len(Like.objects.filter(tweet_id=item.id))
                result['children'][counter]['reply_count'] = len(Tweet.objects.filter(parent_id=item.id))
                result['children'][counter]['retweet_count'] = len(Tweet.objects.filter(retweet_from_id=item.id))
                counter += 1
        values = result['children'].values()
        result['children'] = list(values)
        return result
