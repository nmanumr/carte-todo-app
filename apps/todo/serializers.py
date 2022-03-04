from rest_framework import serializers

from apps.todo.models import UserTask, TaskLabel


class TaskLabelSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = TaskLabel
        fields = ('id', 'title')

    def get_id(self, obj):
        return obj.public_id


class TaskSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    labels = TaskLabelSerializer(many=True)

    class Meta:
        model = UserTask
        fields = ('id', 'priority', 'labels')

    def get_id(self, obj):
        return obj.public_id
