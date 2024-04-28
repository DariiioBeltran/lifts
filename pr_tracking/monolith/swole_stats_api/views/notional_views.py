from swole_stats_api.serializers.notional_serializers import NotionalExerciseSerializer
from swole_stats_api.models.notional_models import NotionalExercise
from rest_framework import generics


class NotionalExercisesList(generics.ListCreateAPIView):
    queryset = NotionalExercise.objects.all()
    serializer_class = NotionalExerciseSerializer

    def perform_create(self, serializer):
        serializer.save(gym_rat=self.request.user)

    # def get_queryset(self):
    #     return NotionalExercise.objects.filter(gym_rat=self.request.user)


class NotionalExerciseDetail(generics.RetrieveAPIView):
    queryset = NotionalExercise.objects.all()
    serializer_class = NotionalExerciseSerializer

    # def get_queryset(self):
    #     return NotionalExercise.objects.filter(gym_rat=self.request.user)
