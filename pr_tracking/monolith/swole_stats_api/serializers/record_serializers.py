from rest_framework import serializers
from swole_stats_api.models.record_models import SetRecord, WorkoutRecord

from swole_stats_api.models.outline_models import WorkoutOutline, ExerciseOutline
from .outline_serializers import ExerciseOutlineSerializer, WorkoutOutlineSerializer


class SetRecordSerializer(serializers.ModelSerializer):
    exercise_outline = ExerciseOutlineSerializer(read_only=True)
    exercise_outline_id = serializers.SlugRelatedField(
        queryset=ExerciseOutline.objects.all(), slug_field="id", write_only=True
    )

    class Meta:
        model = SetRecord
        fields = [
            "exercise_outline",
            "exercise_outline_id",
            "weight",
            "reps_completed",
            "skipped",
        ]


class WorkoutRecordSerializer(serializers.ModelSerializer):
    set_records = SetRecordSerializer(many=True)
    workout_outline = WorkoutOutlineSerializer(read_only=True)
    workout_outline_id = serializers.SlugRelatedField(
        queryset=WorkoutOutline.objects.all(), slug_field="id", write_only=True
    )

    class Meta:
        model = WorkoutRecord
        fields = ["id", "gym_rat", "workout_outline", "workout_outline_id", "set_records"]

    def create(self, validated_data):
        set_records = validated_data.pop("set_records")
        workout_outline = validated_data.pop("workout_outline_id")
        workout_record = WorkoutRecord.objects.create(workout_outline=workout_outline, **validated_data)
        for set_record in set_records:
            exercise_outline = set_record.pop("exercise_outline_id")
            SetRecord.objects.create(workout_record=workout_record, exercise_outline=exercise_outline, **set_record)
        return workout_record
