from django.urls import path
from . import views

app_name = 'gestor_page'

urlpatterns = [
    path('', views.home, name='dashboard'),
    path('register/', views.register, name='register'),
    path('login/', views.log_in, name='login'),
    path('settings/change-password/', views.change_pass, name='change-password'),
    path('update-task/<int:pk>', views.update_task, name='update-task'),
] 