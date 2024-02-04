from django.db import models
from django.contrib.auth.models import User


class SetInstance(models.Model):
    gym_rat = models.ForeignKey(User, on_delete=models.CASCADE)
    workout_name = models.CharField(max_length=128, blank=True, default="")
    exercise_name = models.CharField(max_length=128)
    weight = models.IntegerField()
    reps = models.IntegerField()
    performed_at = models.DateTimeField(
        auto_now=True
    )  # TODO: think about this more, we need all sets in one session to have the same timestamp
