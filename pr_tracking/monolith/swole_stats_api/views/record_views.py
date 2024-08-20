from swole_stats_api.serializers.record_serializers import WorkoutRecordSerializer
from swole_stats_api.models.record_models import WorkoutRecord
from rest_framework import generics
from django.utils import timezone

from rest_framework.permissions import IsAuthenticated, AllowAny


class WorkoutRecordListView(generics.ListCreateAPIView):
    queryset = WorkoutRecord.objects.all().order_by("-id")[:14]
    serializer_class = WorkoutRecordSerializer
    permission_classes = [AllowAny]


class WorkoutRecordDetail(generics.RetrieveAPIView):
    queryset = WorkoutRecord.objects.all()
    serializer_class = WorkoutRecordSerializer
