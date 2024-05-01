from rest_framework import generics
from django.contrib.auth.models import User
from swole_stats_api.serializers.gym_rat_serializers import GymRatSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class GymRatList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = GymRatSerializer
    permission_classes = [AllowAny]


class GymRatDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = GymRatSerializer
