import re
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


def validate_username(value, instance=None):
    value = value.strip()

    if len(value) < 3:
        raise serializers.ValidationError(
            "Username must be at least 3 characters long."
        )

    if len(value) > 20:
        raise serializers.ValidationError(
            "Username cannot be more than 20 characters long."
        )

    if not re.match(r"^[A-Za-z0-9_]+$", value):
        raise serializers.ValidationError(
            "Username can contain only letters, numbers, and underscores."
        )

    if not re.search(r"[A-Za-z]", value):
        raise serializers.ValidationError(
            "Username must contain at least one letter."
        )

    if not re.search(r"[A-Za-z0-9]", value):
        raise serializers.ValidationError(
            "Username cannot contain only underscores."
        )

    queryset = User.objects.filter(username=value)

    if instance:
        queryset = queryset.exclude(id=instance.id)

    if queryset.exists():
        raise serializers.ValidationError(
            "Username already exists."
        )

    return value