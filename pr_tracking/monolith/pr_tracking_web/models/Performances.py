from django.db import models
from .GymRat import GymRat
from django.contrib.auth.models import User

class Performance(models.Model):
    gym_rat = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now=True)
    workout_name = models.CharField(max_length=256)
    number_of_reps = models.IntegerField()
    number_of_sets = models.IntegerField()