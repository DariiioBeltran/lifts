from django.db import models
from django.contrib.auth.models import User
from .exercise import Exercise


class DesignedWorkout(models.Model):
    gym_rat = models.ForeignKey(User, on_delete=models.CASCADE)
    workout_name = models.CharField(max_length=128)
    exercise_name = models.CharField(
        max_length=128
    )  # TODO: add a validator to check that the entry is in the exercises table
    number_of_sets = models.IntegerField()
    number_of_reps = models.IntegerField()
    created_at = models.DateTimeField(auto_now=True)
