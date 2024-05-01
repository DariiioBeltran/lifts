from django.urls import include, path
from swole_stats_api.views import notional_views, outline_views, record_views, gym_rat_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # User Views
    path("gym_rats/", gym_rat_views.GymRatList.as_view()),
    path("gym_rats/<int:pk>", gym_rat_views.GymRatDetail.as_view()),
    # Auth Views
    path("token/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    # Exercise Views
    path("notional_exercise/", notional_views.NotionalExercisesList.as_view()),
    path("notional_exercise/<int:pk>", notional_views.NotionalExerciseDetail.as_view()),
    # Outline Views
    path("workout_outlines/", outline_views.WorkoutOutlineListView.as_view()),
    path("workout_outlines/<int:pk>", outline_views.WorkoutOutlineDetail.as_view()),
    # Record Views
    path("workout_records/", record_views.WorkoutRecordListView.as_view()),
    path("workout_records/<int:pk>", record_views.WorkoutRecordDetail.as_view()),
]
