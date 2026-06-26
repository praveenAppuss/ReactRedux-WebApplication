from rest_framework import serializers
from django.contrib.auth import get_user_model
import re
from .validators import validate_username

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password"
        ]

        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate_username(self, value):
        return validate_username(value)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "is_staff"
        ]



class UserProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "is_staff",
            "profile_image",
        ]

        read_only_fields = [
            "id",
        ]

    def validate_username(self, value):
        return validate_username(
            value,
            instance=self.instance
        )

    def validate_email(self, value):
        user = self.instance

        if User.objects.exclude(id=user.id).filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists."
            )

        return value