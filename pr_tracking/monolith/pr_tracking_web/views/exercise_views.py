from django.shortcuts import render, redirect
from pr_tracking_web.forms.registration import RegistrationForm
from pr_tracking_web.forms.new_exercise_form import NewExerciseForm
from pr_tracking_web.forms.new_designed_workout_form import WorkoutTemplateForm, ExerciseTemplateForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from pr_tracking_web.models.exercise import Exercise
from pr_tracking_web.models.workout_template import WorkoutTemplate, ExerciseTemplate
from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from pr_tracking_web.forms.log_workout_forms import WorkoutInstanceForm, SetInstanceForm
from pr_tracking_web.models.workout_instance import WorkoutInstance, ExerciseInstance, SetInstance
from django.views.generic.list import ListView
from django.forms import inlineformset_factory
from django.contrib.auth.models import User
from datetime import datetime
from django.views.generic.edit import FormView


class CreateExerciseView(LoginRequiredMixin, FormView):
    template_name = "pr_tracking_web/create_exercise.html"
    form_class = NewExerciseForm
    success_url = "/exercises"

    def form_valid(self, form):
        exercise = form.save(commit=False)
        exercise.gym_rat = self.request.user
        exercise.save()
        return super().form_valid(form)


class ListExercisesView(LoginRequiredMixin, TemplateView):
    template_name = "pr_tracking_web/exercises.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["exercises"] = Exercise.objects.filter(gym_rat__exact=self.request.user)
        return context
