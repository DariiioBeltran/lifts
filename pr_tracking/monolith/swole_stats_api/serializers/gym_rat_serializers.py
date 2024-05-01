from rest_framework import serializers
from django.contrib.auth.models import User
from swole_stats_api.models.notional_models import NotionalExercise
from swole_stats_api.models.outline_models import WorkoutOutline
from swole_stats_api.models.record_models import WorkoutRecord


from .notional_serializers import NotionalExerciseSerializer
from .outline_serializers import WorkoutOutlineSerializer


class GymRatSerializer(serializers.ModelSerializer):
    exercises = NotionalExerciseSerializer(many=True, read_only=True)
    workout_outline = WorkoutOutlineSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "exercises",
            "workout_outline",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        gym_rat = User.objects.create_user(**validated_data)
        return gym_rat


class GymRatIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id"]
        extra_kwargs = {"id": {"write_only": True}}
