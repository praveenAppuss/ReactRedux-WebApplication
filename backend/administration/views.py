from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework import filters
from django.contrib.auth import get_user_model

from .serializers import (
    AdminUserListSerializer,
    AdminUserUpdateSerializer,
    AdminUserCreateSerializer,
)

User = get_user_model()

class AdminUserViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = [
        "username",
        "email",
    ]

    def get_queryset(self):
        return User.objects.filter(
            is_staff=False,
            is_superuser=False
        ).order_by("-date_joined")

    def get_serializer_class(self):
        if self.action == "create":
            return AdminUserCreateSerializer
        if self.action in [
            "retrieve",
            "update",
            "partial_update",
        ]:
            return AdminUserUpdateSerializer
        return AdminUserListSerializer