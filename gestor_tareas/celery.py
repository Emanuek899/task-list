import os
from celery import Celery
# Indica donde esta el archivo settings para establecer el modulo de configuracion 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestor_tareas.settings')

# Create a Celery instance
app = Celery('gestor_tareas')

# Load the settings for celery from settings of the project
# also use the prefix in namespace for the settings in django
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto discover new tasks for Celery
app.autodiscover_tasks() 