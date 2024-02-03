from django.db import models
from django.contrib.auth.models import User


class Workout(models.Model):
    gym_rat = models.ForeignKey(User, on_delete=models.CASCADE)
    workout_name = models.CharField(max_length=128)
    exercise_name = models.CharField(max_length=128)
    number_of_sets = models.IntegerField()
    number_of_reps = models.IntegerField()
