from django.urls import include, path
from pr_tracking_web.views import base_views, exercise_views, performance_views, workout_template_views


exercise_patterns = [
    path("create-exercise", exercise_views.CreateExerciseView.as_view(), name="create_exercise"),
    path("exercises", exercise_views.ListExercisesView.as_view(), name="exercises"),
]

workout_template_patterns = [
    path(
        "create-workout-template",
        workout_template_views.CreateWorkoutTemplateView.as_view(),
        name="create_workout_template",
    ),
    path(
        "create-workout-template/<str:pk>",
        workout_template_views.CreateExerciseTemplatesView.as_view(),
        name="create_exercise_template",
    ),
    path(
        "list-workout-templates",
        workout_template_views.ListWorkoutTemplatesView.as_view(),
        name="list_workout_templates",
    ),
]

performance_patterns = [
    path("log-workout", performance_views.CreateWorkoutInstance.as_view(), name="create_workout_instance"),
    path("log-workout/<str:pk>", performance_views.CreateExerciseInstances.as_view(), name="create_exercise_instances"),
    path("list-performances", performance_views.ListPerformances.as_view(), name="list_performances"),
    path(
        "list-performances/instances/<str:pk>",
        performance_views.ListPerformancesInstance.as_view(),
        name="list_performances_instance",
    ),
    path(
        "list-performances/templates/<str:pk>",
        performance_views.ListPerformancesTemplates.as_view(),
        name="list_performances_template",
    ),
]

urlpatterns = [
    # path("", base_views.LandingPage.as_view(), name="landing_page"),
    # path("home", base_views.HomePage.as_view(), name="home"),
    # path("sign-up", base_views.SignUpView.as_view(), name="sign_up"),
    # path("exercises/", include(exercise_patterns)),
    # path("workout-templates/", include(workout_template_patterns)),
    # path("performances/", include(performance_patterns)),
]
