from django import forms
from pr_tracking_web.models.workout_template import WorkoutTemplate, ExerciseTemplate


class WorkoutTemplateForm(forms.ModelForm):
    class Meta:
        model = WorkoutTemplate
        fields = ["workout_template_name"]


class ExerciseTemplateForm(forms.ModelForm):
    class Meta:
        model = ExerciseTemplate
        fields = ["exercise_name", "number_of_sets", "number_of_reps"]
