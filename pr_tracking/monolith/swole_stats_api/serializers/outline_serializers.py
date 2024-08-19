from rest_framework import serializers
from swole_stats_api.models.outline_models import WorkoutOutline, ExerciseOutline
from swole_stats_api.models.notional_models import NotionalExercise
from .notional_serializers import NotionalExerciseSerializer


class ExerciseOutlineSerializer(serializers.ModelSerializer):
    notional_exercise = NotionalExerciseSerializer(read_only=True)
    notional_exercise_id = serializers.SlugRelatedField(
        queryset=NotionalExercise.objects.all(), slug_field="id", write_only=True
    )

    class Meta:
        model = ExerciseOutline
        fields = ["id", "notional_exercise_id", "notional_exercise", "number_of_sets", "number_of_reps"]


class WorkoutOutlineSerializer(serializers.ModelSerializer):
    exercise_outlines = ExerciseOutlineSerializer(many=True)

    class Meta:
        model = WorkoutOutline
        fields = "__all__"

    def create(self, validated_data):
        exercises_data = validated_data.pop("exercise_outlines")
        workout_outline = WorkoutOutline.objects.create(**validated_data)
        for exercise_data in exercises_data:
            notional_exercise = exercise_data.pop("notional_exercise_id")

            ExerciseOutline.objects.create(
                workout_outline=workout_outline, notional_exercise=notional_exercise, **exercise_data
            )
        return workout_outline
