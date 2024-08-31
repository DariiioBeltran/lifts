from django.db import models
from django.contrib.auth.models import User
from .exercise import Exercise


class WorkoutTemplate(models.Model):
    gym_rat = models.ForeignKey(User, on_delete=models.CASCADE)
    workout_template_name = models.CharField(max_length=128)

    def __str__(self):
        return self.workout_template_name.title()


class ExerciseTemplate(models.Model):
    workout_template = models.ForeignKey(WorkoutTemplate, on_delete=models.CASCADE)
    exercise_name = models.ForeignKey(Exercise, on_delete=models.CASCADE)  # TODO: rethink this on_delete
    number_of_sets = models.IntegerField()
    number_of_reps = models.IntegerField()
    created_at = models.DateTimeField(auto_now=True)
