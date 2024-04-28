from swole_stats_api.serializers.outline_serializers import WorkoutOutlineSerializer
from swole_stats_api.models.outline_models import WorkoutOutline
from rest_framework import generics


class WorkoutOutlineListView(generics.ListCreateAPIView):
    queryset = WorkoutOutline.objects.all()
    serializer_class = WorkoutOutlineSerializer


class WorkoutOutlineDetail(generics.RetrieveAPIView):
    queryset = WorkoutOutline.objects.all()
    serializer_class = WorkoutOutlineSerializer
