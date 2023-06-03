from django.contrib import admin

from .models.GymRat import GymRat
from .models.Exercises import Exercise
from .models.Workouts import Workout
from .models.Performances import Performance

# Register your models here.
admin.site.register(GymRat)
admin.site.register(Exercise)
admin.site.register(Workout)
admin.site.register(Performance)
