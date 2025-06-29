from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from gestor_app.models import Tarea 

# Create your views here.
@login_required
def home(request):

    """_summary_

    Returns:
        _type_: _description_
    """   
    return render(request, 'index.html')


def log_in(request):
    """_summary_

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    return render(request, 'login.html')


def register(request):
    """_summary_

    Args:
        request (_type_): _description_
    """
    return render(request, 'register.html')

@login_required
def update_task(request, pk):
    """_summary_

    Args:
        request (_type_): _description_
    """
    task = Tarea.objects.get(pk=pk)
    return render(request, 'editar_tarea.html', {'task':task})


@login_required
def change_pass(request):
    """_summary_

    Args:
        request (_type_): _description_
    """
    return render(request, 'password_change.html')
            
