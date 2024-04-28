from django.db import models
from django.contrib.auth.models import User
from .notional_models import NotionalExercise


class WorkoutOutline(models.Model):
    gym_rat = models.ForeignKey(User, related_name="workout_outline", on_delete=models.CASCADE)
    workout_outline_name = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.workout_outline_name.title()


class ExerciseOutline(models.Model):
    workout_outline = models.ForeignKey(WorkoutOutline, related_name="exercise_outlines", on_delete=models.CASCADE)
    notional_exercise = models.ForeignKey(
        NotionalExercise, related_name="exercise_outlines", on_delete=models.CASCADE
    )  # TODO: rethink this on_delete
    number_of_sets = models.IntegerField()
    number_of_reps = models.IntegerField()
    created_at = models.DateTimeField(auto_now=True)
