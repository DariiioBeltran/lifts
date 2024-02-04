from django import forms
from pr_tracking_web.models.designed_workout import DesignedWorkout


class NewDesignedWorkoutForm(forms.ModelForm):
    class Meta:
        model = DesignedWorkout
        fields = ["workout_name", "exercise_name", "number_of_sets", "number_of_reps"]
