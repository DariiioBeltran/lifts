from django.contrib import admin

from .models.notional_models import NotionalExercise
from .models.outline_models import WorkoutOutline, ExerciseOutline
from .models.record_models import WorkoutRecord, SetRecord


# Register your models here.
admin.site.register(NotionalExercise)
admin.site.register(WorkoutOutline)
admin.site.register(ExerciseOutline)
admin.site.register(WorkoutRecord)
admin.site.register(SetRecord)
