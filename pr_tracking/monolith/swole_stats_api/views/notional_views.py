from swole_stats_api.serializers.notional_serializers import NotionalExerciseSerializer
from swole_stats_api.models.notional_models import NotionalExercise
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class NotionalExercisesList(generics.ListCreateAPIView):
    serializer_class = NotionalExerciseSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(gym_rat=self.request.user)

    def get_queryset(self):
        return NotionalExercise.objects.filter(gym_rat=self.request.user)


class NotionalExerciseDetail(generics.RetrieveAPIView):
    serializer_class = NotionalExerciseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return NotionalExercise.objects.filter(gym_rat=self.request.user)
