from django import forms
from pr_tracking_web.models.designed_workout import DesignedWorkout


class WorkoutNameForm(forms.Form):
    workout_name = forms.CharField(label="Workout Name:", max_length="128")


class NewDesignedWorkoutForm(forms.ModelForm):
    def __init__(self, *args, exercise_choices, **kwargs):
        super(NewDesignedWorkoutForm, self).__init__(*args, **kwargs)
        choices = [(exercise.exercise_name, exercise.exercise_name) for exercise in exercise_choices]
        self.fields["exercise_name"] = forms.ChoiceField(choices=choices)

    class Meta:
        model = DesignedWorkout
        fields = ["exercise_name", "number_of_sets", "number_of_reps"]
