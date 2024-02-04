from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class Exercise(models.Model):
    gym_rat = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise_name = models.CharField(max_length=128)
    body_part = models.CharField(max_length=128, blank=True, default="")  # TODO: max this an enum
    created_at = models.DateTimeField(auto_now=True)

    def validate_unique_for_user(self):
        qs = Exercise.objects.filter(exercise_name=self.exercise_name)
        if qs.filter(gym_rat__id=self.gym_rat.id).exists():
            raise ValidationError("Can not add the same exercise.")

    def save(self, *args, **kwargs):
        self.validate_unique_for_user()
        super(Exercise, self).save(*args, **kwargs)
