from django.shortcuts import render, redirect
from .forms.registration import RegistrationForm
from .forms.new_exercise_form import NewExerciseForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from .models.exercises import Exercise


@login_required(login_url="/login")
def home(request):
    return render(request, 'pr_tracking_web/home.html')


def sign_up(request):
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('/home')
    else:
        form = RegistrationForm()

    return render(request, 'registration/sign_up.html', {"form": form})


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
    return render(request, 'pr_tracking_web/create_exercise.html', {"form": form})


@login_required(login_url="/login")
def exercises(request):
    exercises = Exercise.objects.filter(gym_rat__exact=request.user)
    context = {"exercises": exercises}
    return render(request, 'pr_tracking_web/exercises.html', context)


@login_required(login_url="/login")
def create_workout(request): # TODO
    return render(request, 'pr_tracking_web/home.html')

@login_required(login_url="/login")
def log_workout(request): # TODO
    return render(request, 'pr_tracking_web/home.html')