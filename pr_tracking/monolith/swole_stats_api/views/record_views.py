from swole_stats_api.serializers.record_serializers import WorkoutRecordSerializer
from swole_stats_api.models.record_models import WorkoutRecord
from rest_framework import generics


class WorkoutRecordListView(generics.ListCreateAPIView):
    queryset = WorkoutRecord.objects.all()
    serializer_class = WorkoutRecordSerializer


class WorkoutRecordDetail(generics.RetrieveAPIView):
    queryset = WorkoutRecord.objects.all()
    serializer_class = WorkoutRecordSerializer
