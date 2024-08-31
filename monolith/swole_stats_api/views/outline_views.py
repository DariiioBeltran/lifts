from monolith.swole_stats_api.serializers.outline_serializers import WorkoutOutlineSerializer
from monolith.swole_stats_api.models.outline_models import WorkoutOutline
from rest_framework import generics

from rest_framework.permissions import IsAuthenticated, AllowAny


class WorkoutOutlineListView(generics.ListCreateAPIView):
    queryset = WorkoutOutline.objects.all()
    serializer_class = WorkoutOutlineSerializer
    permission_classes = [AllowAny]


class WorkoutOutlineDetail(generics.RetrieveAPIView):
    queryset = WorkoutOutline.objects.all()
    serializer_class = WorkoutOutlineSerializer
    permission_classes = [AllowAny]
