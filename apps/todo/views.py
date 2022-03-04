from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from apps.todo import models
from apps.todo.serializers import TaskSerializer
from todo.core.views import GenericAPIView


class ListCreateTaskApiView(GenericAPIView, ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TaskSerializer

    def get_queryset(self):
        return models.TaskLabel.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RetrieveUpdateDestroyTaskAPIView(GenericAPIView, RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TaskSerializer
    lookup_field = 'public_id'
    lookup_url_kwarg = 'id'

    def get_queryset(self):
        return models.TaskLabel.objects.filter(user=self.request.user)
