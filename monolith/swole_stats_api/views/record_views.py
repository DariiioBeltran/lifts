from monolith.swole_stats_api.serializers.record_serializers import WorkoutRecordSerializer, SetRecordSerializer
from monolith.swole_stats_api.models.record_models import WorkoutRecord, SetRecord
from rest_framework import generics


class WorkoutRecordListView(generics.ListCreateAPIView):
    queryset = WorkoutRecord.objects.all().order_by("-id")[:14]
    serializer_class = WorkoutRecordSerializer


class WorkoutRecordDetail(generics.RetrieveAPIView):
    queryset = WorkoutRecord.objects.all()
    serializer_class = WorkoutRecordSerializer


class SetRecordListView(generics.ListCreateAPIView):
    queryset = SetRecord.objects.all().order_by("-id")
    serializer_class = SetRecordSerializer


class SetRecordDetail(generics.RetrieveAPIView):
    queryset = SetRecord.objects.all()
    serializer_class = SetRecordSerializer
