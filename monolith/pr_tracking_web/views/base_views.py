from django.shortcuts import render, redirect
from monolith.pr_tracking_web.forms.registration import RegistrationForm
from monolith.pr_tracking_web.forms.new_exercise_form import NewExerciseForm
from monolith.pr_tracking_web.forms.new_designed_workout_form import WorkoutTemplateForm, ExerciseTemplateForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from monolith.pr_tracking_web.models.exercise import Exercise
from monolith.pr_tracking_web.models.workout_template import WorkoutTemplate, ExerciseTemplate
from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from monolith.pr_tracking_web.forms.log_workout_forms import WorkoutInstanceForm, SetInstanceForm
from monolith.pr_tracking_web.models.workout_instance import WorkoutInstance, ExerciseInstance, SetInstance
from django.views.generic.list import ListView
from django.forms import inlineformset_factory
from django.contrib.auth.models import User
from datetime import datetime
from django.views.generic.edit import FormView


class LandingPage(TemplateView):
    template_name = "pr_tracking_web/landing_page.html"


class HomePage(LoginRequiredMixin, TemplateView):
    template_name = "pr_tracking_web/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["exercises"] = Exercise.objects.filter(gym_rat__exact=self.request.user)
        workouts = []
        workout_templates = WorkoutTemplate.objects.filter(gym_rat__exact=self.request.user)
        for workout_template in workout_templates:
            workouts.append(
                dict(
                    workout_name=workout_template.workout_template_name,
                    workout_template=workout_template,
                    exercise_templates=ExerciseTemplate.objects.filter(workout_template__exact=workout_template),
                )
            )
        context["workout_templates"] = workouts
        context["workout_instances"] = WorkoutInstance.objects.filter(gym_rat__exact=self.request.user)[:5]

        return context


class SignUpView(FormView):
    template_name = "registration/sign_up.html"
    form_class = NewExerciseForm
    success_url = "/home"

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return super().form_valid(form)
