from django.db import models
from django.contrib.auth.models import User


class Performance(models.Model):
    gym_rat = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    workout_name = models.CharField(max_length=256)
    number_of_reps = models.IntegerField()
    number_of_sets = models.IntegerField()

    def __str__(self):
        return f"gymrat: {self.gym_rat}, workout: {self.workout_name}, datetime: {self.created_at}"
