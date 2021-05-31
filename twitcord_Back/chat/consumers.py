from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from twitcord_app.models import RoomMessage
from twitcord_app.serializers import RoomMessageSerializer


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive_json(self, content, **kwargs):
        message = content['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send_json(content={
            'message': message
        })


class RoomConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'room_{self.room_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive_json(self, content, **kwargs):
        message = content['message']
        sender = self.scope['user']

        # save message in database
        room_message = await self.save_room_message(message, sender.id, self.room_id)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'room_message': room_message
            }
        )

    @database_sync_to_async
    def save_room_message(self, content, sender_id, room_id):
        print(content, sender_id, room_id)
        obj = RoomMessage.objects.create(
            sender_id=sender_id,
            room_id=room_id,
            content=content
        )
        # deserialized_message = RoomMessageSerializer(instance=obj, context=).data
        return obj

    # Receive message from room group
    async def chat_message(self, event):
        message = event['room_message']

        # Send message to WebSocket
        await self.send_json(content={
            'message': message
        })
