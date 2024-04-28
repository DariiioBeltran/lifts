from rest_framework import generics
from django.contrib.auth.models import User
from swole_stats_api.serializers.gym_rat_serializers import GymRatSerializer


class GymRatList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = GymRatSerializer


class GymRatDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = GymRatSerializer
