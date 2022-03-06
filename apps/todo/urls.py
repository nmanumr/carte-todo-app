from django.urls import path

from apps.todo import views

app_label = 'todo'
urlpatterns = [
    path('', views.ListCreateTaskApiView.as_view()),
    path('labels/', views.ListUserLabelsApiView.as_view()),
    path('<public_id>/', views.RetrieveUpdateDestroyTaskAPIView.as_view()),
]
