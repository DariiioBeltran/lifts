from rest_framework import serializers
from django.contrib.auth.models import User
from swole_stats_api.models.notional_models import NotionalExercise
from swole_stats_api.models.outline_models import WorkoutOutline
from swole_stats_api.models.record_models import WorkoutRecord


class GymRatSerializer(serializers.ModelSerializer):
    exercises = serializers.PrimaryKeyRelatedField(many=True, queryset=NotionalExercise.objects.all())
    # workout_outlines = serializers.PrimaryKeyRelatedField(many=True, queryset=WorkoutOutline.objects.all())
    # workout_records = serializers.PrimaryKeyRelatedField(many=True, queryset=WorkoutRecord.objects.all())

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "exercises",
            # 'workout_outlines',
            # 'workout_records',
        ]
