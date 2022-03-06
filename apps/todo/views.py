from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.todo import models
from apps.todo.serializers import TaskSerializer, CreateTaskSerializer
from todo.core.views import GenericAPIView


class ListUserLabelsApiView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, *args):
        labels = models.TaskLabel.objects.filter(user=self.request.user)
        return Response([l.title for l in labels])


class ListCreateTaskApiView(GenericAPIView, ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return models.UserTask.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateTaskSerializer
        return TaskSerializer

    def perform_create(self, serializer: TaskSerializer):
        data = serializer.validated_data
        labels = data.get('labels', [])
        labels = [models.TaskLabel.objects.get_or_create(title=l, user=self.request.user)[0].id for l in labels]

        serializer.save(labels=labels, user=self.request.user)


class RetrieveUpdateDestroyTaskAPIView(GenericAPIView, RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    lookup_field = 'public_id'

    def get_serializer_class(self):
        if self.request.method in ('PUT', 'PATCH'):
            return CreateTaskSerializer
        return TaskSerializer

    def perform_update(self, serializer: TaskSerializer):
        data = serializer.validated_data
        labels = data.get('labels', [])
        labels = [models.TaskLabel.objects.get_or_create(title=l, user=self.request.user)[0].id for l in labels]

        serializer.save(labels=labels)

    def get_queryset(self):
        return models.UserTask.objects.filter(user=self.request.user)
