from django.db import models
from django.contrib.auth.models import User

class Exercise(models.Model):
    gym_rat = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise_name = models.CharField(max_length=128)