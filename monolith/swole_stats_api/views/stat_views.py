from monolith.swole_stats_api.serializers.record_serializers import WorkoutRecordSerializer, SetRecordSerializer
from monolith.swole_stats_api.models.record_models import WorkoutRecord, SetRecord
from monolith.swole_stats_api.models.outline_models import ExerciseOutline

from monolith.swole_stats_api.models.notional_models import NotionalExercise

from rest_framework import generics


from rest_framework.permissions import IsAuthenticated, AllowAny


class ExerciseStatsListView(generics.ListAPIView):
    serializer_class = SetRecordSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        notional_exercise_id = self.kwargs["pk"]
        return SetRecord.objects.filter(
            exercise_outline__notional_exercise__id=notional_exercise_id,
        )
