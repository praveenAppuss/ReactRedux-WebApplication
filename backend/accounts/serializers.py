from rest_framework import serializers
from django.contrib.auth import get_user_model

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

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user


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
            "profile_image"
        ]

        read_only_fields = [
            "id",
            "email"
        ]