from django.urls import path
from . import views


urlpatterns = [
    path("", views.LandingPage.as_view(), name="landing_page"),
    path("home", views.HomePage.as_view(), name="home"),
    path("sign-up", views.SignUpView.as_view(), name="sign_up"),
    path("create-exercise", views.CreateExerciseView.as_view(), name="create_exercise"),
    path("exercises", views.ListExercisesView.as_view(), name="exercises"),
    path("create-workout-template", views.CreateWorkoutTemplateView.as_view(), name="create_workout_template"),
    path(
        "create-workout-template/<str:pk>", views.CreateExerciseTemplatesView.as_view(), name="create_exercise_template"
    ),
    path("list-workout-templates", views.ListWorkoutTemplatesView.as_view(), name="list_workout_templates"),
    path("log-workout", views.log_workout, name="log_workout"),
]
