from django.shortcuts import render, redirect
from .forms.registration import RegistrationForm
from .forms.new_exercise_form import NewExerciseForm
from .forms.new_designed_workout_form import NewDesignedWorkoutForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from .models.exercise import Exercise
from .models.designed_workout import DesignedWorkout

from django.forms import inlineformset_factory
from django.contrib.auth.models import User


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
        remove workout_name from all rows of the form and only ask for it once
        make options for exercise, user shouldn't input the name (this might have to be done w/ a foreign key in the model)
    """
    gym_rat = User.objects.get(pk=request.user.id)
    DesignedWorkoutSet = inlineformset_factory(User, DesignedWorkout, form=NewDesignedWorkoutForm, extra=9)
    formset = DesignedWorkoutSet(instance=gym_rat)

    if request.method == "POST":
        formset = DesignedWorkoutSet(request.POST, instance=gym_rat)
        if formset.is_valid():
            formset.save()
            return redirect("/home")

    context = {"formset": formset}
    return render(request, "pr_tracking_web/create_designed_workout.html", context)


@login_required(login_url="/login")
def list_workouts(request):
    return render(request, "pr_tracking_web/home.html")


@login_required(login_url="/login")
def log_workout(request):  # TODO
    return render(request, "pr_tracking_web/home.html")
