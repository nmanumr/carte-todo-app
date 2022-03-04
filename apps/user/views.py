from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from apps.token.models import AccessToken
from apps.token.serializers import AccessTokenSerializer
from apps.user.serializers import (
    AuthenticateUserSerializer, UserProfileSerializer, CreateUserSerializer
)
from todo.core.views import GenericAPIView, CreateAPIViewEx


def generate_access_token(user):
    access_token = AccessToken.objects.create(owner=user)
    return AccessTokenSerializer(instance=access_token).data


class AuthenticateUserView(GenericAPIView):
    serializer_class = AuthenticateUserSerializer
    permission_classes = ()

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        return generate_access_token(user)


class CreateAccountView(CreateAPIViewEx, GenericAPIView):
    permission_classes = ()
    serializer_class = CreateUserSerializer


class UserProfileView(UpdateAPIView, GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user

    def get(self, request):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return serializer.data
