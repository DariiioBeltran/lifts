from django.shortcuts import render, redirect
from .forms.registration import RegistrationForm
from .forms.new_exercise_form import NewExerciseForm
from .forms.new_designed_workout_form import WorkoutTemplateForm, ExerciseTemplateForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from .models.exercise import Exercise
from .models.workout_template import WorkoutTemplate, ExerciseTemplate
from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from .forms.log_workout_forms import WorkoutInstanceForm, SetInstanceForm
from .models.workout_instance import WorkoutInstance, ExerciseInstance, SetInstance

from django.forms import inlineformset_factory
from django.contrib.auth.models import User

from datetime import datetime

from django.views.generic.edit import FormView


class LandingPage(TemplateView):
    template_name = "pr_tracking_web/landing_page.html"


class HomePage(LoginRequiredMixin, TemplateView):
    template_name = "pr_tracking_web/home.html"


class SignUpView(FormView):
    template_name = "registration/sign_up.html"
    form_class = NewExerciseForm
    success_url = "/home"

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return super().form_valid(form)


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


class CreateWorkoutInstance(LoginRequiredMixin, FormView):
    template_name = "pr_tracking_web/create_workout_instance.html"
    form_class = WorkoutInstanceForm

    def form_valid(self, form):
        workout_instance = form.save(commit=False)
        workout_instance.gym_rat = self.request.user
        workout_instance.save()
        self.pk = workout_instance.pk
        return super().form_valid(form)

    def get_success_url(self):
        return reverse("create_exercise_instances", kwargs={"pk": self.pk})


class CreateExerciseInstances(LoginRequiredMixin, TemplateView):
    template_name = "pr_tracking_web/create_exercise_instances.html"
    prefix_exercise_instance_map = dict()

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.workout_instance = WorkoutInstance.objects.get(pk=self.kwargs["pk"])
        self.exercises = ExerciseTemplate.objects.filter(workout_template=self.workout_instance.workout_template)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        exercise_forms = dict()

        for exercise_template in self.exercises:
            exercise_instance = ExerciseInstance.objects.create(
                workout_instance=self.workout_instance,
                exercise_template=exercise_template,
            )
            forms = []
            for i in range(exercise_template.number_of_sets):
                form_prefix = f"{exercise_template.exercise_name}-{i}"
                self.prefix_exercise_instance_map[form_prefix] = exercise_instance
                forms.append(SetInstanceForm(prefix=form_prefix))

            exercise_forms[exercise_template.exercise_name] = forms

        context["exercise_forms"] = exercise_forms
        return context

    def get(self, request, *args, **kwargs):
        return render(self.request, self.template_name, self.get_context_data(**kwargs))

    def post(self, request, *args, **kwargs):
        for prefix, exercise_instance in self.prefix_exercise_instance_map.items():
            set_instance = SetInstance(exercise_instance=exercise_instance)
            form = SetInstanceForm(request.POST, instance=set_instance, prefix=prefix)
            if form.is_valid():
                form.save()
            else:
                raise ValueError("some message, will need to revisit")

        return redirect("/home")
