from django.contrib import admin

from .models.exercises import Exercise
from .models.workouts import Workout
from .models.performances import Performance

# Register your models here.
admin.site.register(Exercise)
admin.site.register(Workout)
admin.site.register(Performance)
