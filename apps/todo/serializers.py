from rest_framework import serializers

from apps.todo.models import UserTask, TaskLabel


class TaskLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskLabel
        fields = ('public_id', 'title')


class TaskSerializer(serializers.ModelSerializer):
    labels = TaskLabelSerializer(many=True)

    class Meta:
        model = UserTask
        fields = ('public_id', 'title', 'priority', 'labels')


class CreateTaskSerializer(serializers.ModelSerializer):
    labels = serializers.ListField(child=serializers.CharField(), write_only=True)

    class Meta:
        model = UserTask
        fields = ('title', 'priority', 'labels')
