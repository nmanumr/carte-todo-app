from django.contrib.auth import authenticate
from rest_framework import serializers

from apps.user.models import User


class AuthenticateUserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=64, trim_whitespace=False)
    password = serializers.CharField(max_length=64, trim_whitespace=False)

    def validate(self, attrs):
        super().validate(attrs)

        user = authenticate(
            request=self.context.get('request'),
            username=attrs['username'], password=attrs['password']
        )

        if user is None:
            msg = 'Invalid username and or password'
            raise serializers.ValidationError(msg, code='invalid_credentials')

        attrs['user'] = user
        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'is_verified')
        read_only_fields = ('display_name', 'is_verified')


class CreateUserSerializer(serializers.ModelSerializer):
    default_error_messages = {
        'email_collision': 'A user with with given email already exists.',
    }

    class Meta:
        model = User
        fields = ('username', 'email', 'password',)

    def validate_email(self, email):
        email = User.objects.normalize_email(email)
        existing_user = User.objects.filter(email__iexact=email).first()
        if existing_user is not None:
            raise serializers.ValidationError(
                self.error_messages['email_collision'],
                code='email_collision'
            )

        return email

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
