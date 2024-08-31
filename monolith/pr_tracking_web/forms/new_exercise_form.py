from django import forms
from monolith.pr_tracking_web.models.exercise import Exercise


class NewExerciseForm(forms.ModelForm):
    class Meta:
        model = Exercise
        fields = ["exercise_name", "body_part"]
