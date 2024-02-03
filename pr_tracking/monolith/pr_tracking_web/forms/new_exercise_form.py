from django import forms
from pr_tracking_web.models.exercises import Exercise


class NewExerciseForm(forms.ModelForm):
    class Meta:
        model = Exercise
        fields = ["exercise_name"]
