from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from enum import Enum
from django.utils.translation import gettext_lazy as _


class NotionalExercise(models.Model):
    MUSCLE_GROUPS = (
        ("SHOULDERS", _("SHOULDERS")),
        ("BACK", _("BACK")),
        ("CHEST", _("CHEST")),
        ("ARMS", _("ARMS")),
        ("LEGS", _("LEGS")),
        ("CORE", _("CORE")),
    )

    EXERCISE_SCOPE = (
        ("ISOLATION", "ISOLATION"),
        ("COMPOUND", "COMPOUND"),
    )

    EQUIPMENT_CATEGORY = (
        ("DUMBELL", "DUMBELL"),
        ("BARBELL", "BARBELL"),
        ("MACHINE", "MACHINE"),
        ("CABLES", "CABLES"),
        ("KETTLEBELL", "KETTLEBELL"),
    )

    gym_rat = models.ForeignKey(User, related_name="exercises", on_delete=models.CASCADE)
    exercise_name = models.CharField(max_length=128)
    primary_muscle_group = models.CharField(max_length=128, choices=MUSCLE_GROUPS)
    secondary_muscle_groups = models.CharField(max_length=128, choices=MUSCLE_GROUPS, blank=True, null=True)
    exercise_scope = models.CharField(max_length=128, choices=EXERCISE_SCOPE)
    equipment_category = models.CharField(max_length=128, choices=EQUIPMENT_CATEGORY)
    created_at = models.DateTimeField(auto_now=True)

    def validate_unique_for_user(self):
        qs = NotionalExercise.objects.filter(exercise_name=self.exercise_name)
        if qs.filter(gym_rat__id=self.gym_rat.id).exists():
            raise ValidationError("Can not add the same exercise.")

    def save(self, *args, **kwargs):
        self.validate_unique_for_user()
        super(NotionalExercise, self).save(*args, **kwargs)

    def __str__(self):
        return self.exercise_name.title()
