from rest_framework import serializers
from monolith.swole_stats_api.models.notional_models import NotionalExercise
from django.contrib.auth.models import User


class NotionalExerciseSerializer(serializers.ModelSerializer):
    gym_rat = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = NotionalExercise
        fields = "__all__"
