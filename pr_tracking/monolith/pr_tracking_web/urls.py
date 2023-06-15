from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('home', views.home, name="home"),
    path('sign-up', views.sign_up, name="sign_up"),
    path('create-exercise', views.create_exerice, name="create_exercise"),
    path('exercises', views.exercises, name="exercises"),
    path('create-workout', views.create_workout, name="create_workout"),
    path('log-workout', views.log_workout, name="log_workout"),
]