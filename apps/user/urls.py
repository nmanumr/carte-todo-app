from django.urls import path

from apps.user import views

app_label = 'user'
urlpatterns = [
    path('authenticate/', views.AuthenticateUserView.as_view()),
    path('me/', views.UserProfileView.as_view()),
    path('create/', views.CreateAccountView.as_view()),
]
