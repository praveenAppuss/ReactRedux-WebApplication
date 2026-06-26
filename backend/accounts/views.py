from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserSerializer,
    UserProfileSerializer
)
from .permissions import IsActiveUser


from django.contrib.auth import get_user_model

User = get_user_model()


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            "success": True,
            "user": UserSerializer(user).data,
            "access_token": str(refresh.access_token),
            "refresh": str(refresh)
        })

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )



@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data["email"]
    password = serializer.validated_data["password"]

    user = User.objects.filter(email=email).first()
    if not user:
        return Response(
            {"message": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if not user.is_active:
        return Response(
            {"message": "User account is blocked"},
            status=status.HTTP_403_FORBIDDEN
        )

    if not user.check_password(password):
        return Response(
            {"message": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )
    

    refresh = RefreshToken.for_user(user)

    return Response({
        "success": True,
        "user": UserSerializer(user).data,
        "access_token": str(refresh.access_token),
        "refresh": str(refresh),
        "is_admin": user.is_staff

    })


class UserProfileView(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated,IsActiveUser]
    parser_classes = [
        MultiPartParser,
        FormParser,
        JSONParser,
    ]

    def get_object(self):
        return self.request.user
    
    def delete(self, request):
        user = request.user

        if user.profile_image:
            user.profile_image.delete(save=False)
            user.profile_image = None
            user.save()

        return Response(
            {"message": "Profile image deleted successfully"},
            status=status.HTTP_200_OK,
        )