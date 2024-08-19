from django.db import models
from django.contrib.auth.models import User
from .outline_models import WorkoutOutline, ExerciseOutline


class WorkoutRecord(models.Model):
    gym_rat = models.ForeignKey(User, related_name="workout_records", on_delete=models.CASCADE)
    workout_outline = models.ForeignKey(WorkoutOutline, related_name="workout_records", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.workout_outline.workout_outline_name)


class SetRecord(models.Model):
    workout_record = models.ForeignKey(
        WorkoutRecord, related_name="set_records", on_delete=models.CASCADE, blank=True, null=True
    )  # TODO: rethink this on_delete
    exercise_outline = models.ForeignKey(
        ExerciseOutline, related_name="set_records", on_delete=models.CASCADE
    )  # TODO: rethink this on_delete
    weight = models.IntegerField(blank=True, null=True)
    reps_completed = models.IntegerField(blank=True, null=True)
    volume = models.IntegerField(blank=True, null=True)
    skipped = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)

    def is_skipped(self):
        filled = bool(self.weight and self.reps_completed)
        skipped = self.skipped

        # Raise validation error if set wasn't filled out or marked as skipped
        if not filled and not skipped:
            raise ValidationError("Set record must be either skipped of filled in.")

        return skipped

    def save(self, *args, **kwargs):
        if not self.is_skipped():
            self.volume = int(self.weight) * int(self.reps_completed)

        super(SetRecord, self).save(*args, **kwargs)

    def __str__(self):
        return f"{str(self.exercise_outline)} at {self.created_at.strftime('%Y-%m-%d')}"
