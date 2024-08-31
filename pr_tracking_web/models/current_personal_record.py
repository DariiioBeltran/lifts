from django.db import models
from django.contrib.auth.models import User

from .workout_instance import SetInstance


class CurrentPersonalRecord(models.Model):
    gym_rat = models.ForeignKey(User, on_delete=models.CASCADE)
    pr = models.OneToOneField(SetInstance, on_delete=models.CASCADE)
