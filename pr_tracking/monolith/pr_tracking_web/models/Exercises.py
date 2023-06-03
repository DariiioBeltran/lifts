from django.db import models
from .GymRat import GymRat
from django.contrib.auth.models import User

class Exercise(models.Model):
    gym_rat = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.CharField(max_length=256)