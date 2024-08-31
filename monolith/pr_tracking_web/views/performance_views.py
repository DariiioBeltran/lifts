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
        self.workout_template = WorkoutTemplate.objects.get(id=self.kwargs["pk"])

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        workout_instance = WorkoutInstance.objects.create(
            gym_rat=self.request.user, workout_template=self.workout_template
        )
        exercises = ExerciseTemplate.objects.filter(workout_template=self.workout_template)

        exercise_forms = dict()

        for exercise_template in exercises:
            exercise_instance = ExerciseInstance.objects.create(
                workout_instance=workout_instance,
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


class ListPerformances(LoginRequiredMixin, ListView):
    template_name = "pr_tracking_web/list_workout_instances.html"
    model = WorkoutInstance
    context_object_name = "workout_instances"
    paginate_by = 100

    def get_queryset(self):
        return WorkoutInstance.objects.filter(gym_rat__exact=self.request.user)  # TODO: order by date, recent to old


class ListPerformancesInstance(LoginRequiredMixin, TemplateView):
    template_name = "pr_tracking_web/list_specific_workout_instances.html"

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.workout_instance = WorkoutInstance.objects.get(id=kwargs["pk"])
        self.exercise_instances = ExerciseInstance.objects.filter(workout_instance=self.workout_instance)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["workout_title"] = self.workout_instance
        exercises_obj = dict()
        for exercise in self.exercise_instances:
            exercises_obj[exercise.exercise_template.exercise_name] = SetInstance.objects.filter(
                exercise_instance=exercise
            )

        context["exercises"] = exercises_obj

        return context


class ListPerformancesTemplates(LoginRequiredMixin, TemplateView):
    template_name = "pr_tracking_web/list_performances_by_template.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["workout_template"] = WorkoutTemplate.objects.get(id=kwargs["pk"])
        context["workout_instances"] = WorkoutInstance.objects.filter(workout_template__id=kwargs["pk"])

        return context
