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


class CreateWorkoutTemplateView(LoginRequiredMixin, FormView):
    template_name = "pr_tracking_web/create_workout_template.html"
    form_class = WorkoutTemplateForm

    def form_valid(self, form):
        workout = form.save(commit=False)
        workout.gym_rat = self.request.user
        workout.save()
        self.pk = workout.pk
        return super().form_valid(form)

    def get_success_url(self):
        return reverse("create_exercise_template", kwargs={"pk": self.pk})


class CreateExerciseTemplatesView(LoginRequiredMixin, TemplateView):
    template_name = "pr_tracking_web/create_exercise_templates.html"
    ExerciseWorkoutSet = inlineformset_factory(WorkoutTemplate, ExerciseTemplate, form=ExerciseTemplateForm, extra=1)

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.workout_template = WorkoutTemplate.objects.get(id=kwargs["pk"])

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["formset"] = self.ExerciseWorkoutSet(instance=self.workout_template)
        return context

    def get(self, request, *args, **kwargs):
        return render(self.request, self.template_name, self.get_context_data(**kwargs))

    def post(self, request, *args, **kwargs):
        formset = self.ExerciseWorkoutSet(self.request.POST, instance=self.workout_template)
        if formset.is_valid():
            instances = formset.save(commit=False)
            created_at = datetime.now()

            for instance in instances:
                instance.workout_template = self.workout_template
                instance.created_at = created_at
                instance.save()

            return redirect("/home")


class ListWorkoutTemplatesView(LoginRequiredMixin, TemplateView):
    template_name = "pr_tracking_web/list_workout_templates.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        workouts = []
        workout_templates = WorkoutTemplate.objects.filter(gym_rat__exact=self.request.user)
        for workout_template in workout_templates:
            workouts.append(
                dict(
                    workout_name=workout_template.workout_template_name,
                    exercise_templates=ExerciseTemplate.objects.filter(workout_template__exact=workout_template),
                )
            )
        context["workouts"] = workouts
        return context
