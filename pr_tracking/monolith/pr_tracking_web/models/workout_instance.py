from django.db import models
from django.contrib.auth.models import User
from .workout_template import WorkoutTemplate, ExerciseTemplate
from .exercise import Exercise


class WorkoutInstance(models.Model):
    gym_rat = models.ForeignKey(User, on_delete=models.CASCADE)
    workout_template = models.ForeignKey(WorkoutTemplate, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)


class ExerciseInstance(models.Model):
    workout_instance = models.ForeignKey(WorkoutInstance, on_delete=models.CASCADE)  # TODO: rethink this on_delete
    exercise_template = models.ForeignKey(ExerciseTemplate, on_delete=models.CASCADE)  # TODO: rethink this on_delete
    created_at = models.DateTimeField(auto_now=True)


class SetInstance(models.Model):
    exercise_instance = models.ForeignKey(
        ExerciseInstance, on_delete=models.CASCADE, blank=True, null=True
    )  # TODO: rethink this on_delete
    weight = models.IntegerField()
    reps_completed = models.IntegerField()
    skipped = models.BooleanField(default=False)
