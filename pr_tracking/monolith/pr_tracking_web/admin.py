from django.contrib import admin

from .models.designed_workout import DesignedWorkout
from .models.exercise import Exercise
from .models.set_instance import SetInstance
from .models.current_personal_record import CurrentPersonalRecord


# Register your models here.
admin.site.register(Exercise)
admin.site.register(DesignedWorkout)
admin.site.register(SetInstance)
admin.site.register(CurrentPersonalRecord)
