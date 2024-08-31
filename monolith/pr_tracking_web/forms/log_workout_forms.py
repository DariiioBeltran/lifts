from django import forms
from monolith.pr_tracking_web.models.workout_instance import WorkoutInstance, SetInstance


class WorkoutInstanceForm(forms.ModelForm):
    class Meta:
        model = WorkoutInstance
        fields = ["workout_template"]


class SetInstanceForm(forms.ModelForm):
    class Meta:
        model = SetInstance
        fields = ["weight", "reps_completed", "skipped"]
