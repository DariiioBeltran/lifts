from swole_stats_api.serializers.record_serializers import WorkoutRecordSerializer, SetRecordSerializer
from swole_stats_api.models.record_models import WorkoutRecord, SetRecord
from swole_stats_api.models.outline_models import ExerciseOutline
from swole_stats_api.models.notional_models import NotionalExercise
from rest_framework import generics


class ExerciseStatsListView(generics.ListAPIView):
    serializer_class = SetRecordSerializer

    def get_queryset(self):
        notional_exercise_id = self.kwargs["pk"]
        return SetRecord.objects.filter(
            exercise_outline__notional_exercise__id=notional_exercise_id,
        )
