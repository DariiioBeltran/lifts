from django.contrib import admin

from .models.workout_template import WorkoutTemplate, ExerciseTemplate
from .models.exercise import Exercise
from .models.current_personal_record import CurrentPersonalRecord
from .models.workout_instance import WorkoutInstance, ExerciseInstance, SetInstance


# Register your models here.
admin.site.register(Exercise)
admin.site.register(WorkoutTemplate)
admin.site.register(ExerciseTemplate)
admin.site.register(WorkoutInstance)
admin.site.register(ExerciseInstance)
admin.site.register(SetInstance)
admin.site.register(CurrentPersonalRecord)
