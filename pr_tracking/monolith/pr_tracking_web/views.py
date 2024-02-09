from django.shortcuts import render, redirect
from .forms.registration import RegistrationForm
from .forms.new_exercise_form import NewExerciseForm
from .forms.new_designed_workout_form import NewDesignedWorkoutForm, WorkoutNameForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from .models.exercise import Exercise
from .models.designed_workout import DesignedWorkout

from django.forms import inlineformset_factory
from django.contrib.auth.models import User

from datetime import datetime


@login_required(login_url="/login")
def home(request):
    return render(request, "pr_tracking_web/home.html")


def sign_up(request):
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("/home")
    else:
        form = RegistrationForm()

    return render(request, "registration/sign_up.html", {"form": form})


@login_required(login_url="/login")
def create_exerice(request):
    if request.method == "POST":
        form = NewExerciseForm(request.POST)
        if form.is_valid():
            exercise = form.save(commit=False)
            exercise.gym_rat = request.user
            exercise.save()
            return redirect("/exercises")
    else:
        form = NewExerciseForm()
    return render(request, "pr_tracking_web/create_exercise.html", {"form": form})


@login_required(login_url="/login")
def exercises(request):
    exercises = Exercise.objects.filter(gym_rat__exact=request.user)
    context = {"exercises": exercises}
    return render(request, "pr_tracking_web/exercises.html", context)


@login_required(login_url="/login")
def create_workout(request):
    """
    TODO:
        - Figure out why it's only saving one exercise in the db
        - Consider shifting the "workout_name" logic into the js in the template?
    """
    gym_rat = User.objects.get(pk=request.user.id)
    exercise_choices = Exercise.objects.filter(gym_rat__exact=gym_rat)
    DesignedWorkoutSet = inlineformset_factory(User, DesignedWorkout, form=NewDesignedWorkoutForm, extra=1)

    if request.method == "POST":
        formset = DesignedWorkoutSet(request.POST, form_kwargs={"exercise_choices": exercise_choices}, instance=gym_rat)
        workout_name = WorkoutNameForm(request.POST)

        if formset.is_valid() and workout_name.is_valid():
            instances = formset.save(commit=False)
            workout_name_instance = workout_name.cleaned_data.get("workout_name")
            created_at = datetime.now()

            for instance in instances:
                instance.workout_name = workout_name_instance
                instance.created_at = created_at
                instance.save()

            # formset.save()
            return redirect("/home")
    else:
        workout_name = WorkoutNameForm()
        formset = DesignedWorkoutSet(form_kwargs={"exercise_choices": exercise_choices})

    context = {"formset": formset, "workout_name": workout_name}
    return render(request, "pr_tracking_web/create_designed_workout.html", context)


@login_required(login_url="/login")
def list_workouts(request):
    """
    IDEA:
        add a workout_id (maybe use uuid) col to the designed_workout table to make it easier to query
        add a workout_ids field in the User table, it'll be an array and we'll append it w/ the workout_id when the user creates a designed_workout

        Once this is in place, we can query this as follows


    """

    gym_rat = User.objects.get(pk=request.user.id)

    return render(request, "pr_tracking_web/home.html")


@login_required(login_url="/login")
def log_workout(request):  # TODO
    return render(request, "pr_tracking_web/home.html")
