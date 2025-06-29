from django.urls import path
from . import views

urlpatterns = [
    path('nuevo-usuario/', views.agregar_usuario, name='nuevo-usuario'),
    path('iniciar-sesion/', views.iniciar_sesion, name='inicias_sesion'),
    path('cerrar-sesion/', views.desconectar_usuario, name='cerrar-sesion'),
    path('ver-tareas/', views.ver_tareas, name='ver-tareas'),
    path('agregar-tarea/', views.agregar_tarea, name='agregar_tarea'),
    path('edit-task/<int:pk>', views.editar_tarea, name='editar-tarea'),
    path('borrar-tarea/<int:id>', views.borrar_tarea, name='borrar-tarea'),
    path('datos-de-usuario/', views.user_data, name='user-data'),
    path('change-password/', views.change_pass, name='change-password'),
]
