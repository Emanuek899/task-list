from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth import authenticate, login as auth_log, logout
from django.contrib.auth.models import User
from django.shortcuts import redirect
from .models import Tarea
from . import serializers

# Create your views here.
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def ver_tareas(request, pk=None):
    if pk is not None:
        # Search for only one task in the database by pk
        objeto = Tarea.objects.get(pk=pk)
        serializer = serializers.TareaSerializer(objeto)
        if not serializer.data:
            # If there does not exist any task
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        #Search for all the tasks of one user
        try:
            user = request.user
            tareas = Tarea.objects.filter(user=user)
            serializer = serializers.TareaSerializer(tareas, many=True)
            if not serializer.data:
                return Response(serializer.data,status=status.HTTP_200_OK)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

     

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def agregar_tarea(request):
    """
    Vista para agregar una nueva tarea
    """
    data = request.data
    serializer = serializers.TareaSerializer(data=data)
    if serializer.is_valid():
        tarea = serializer.save(user=request.user)
        return Response(serializer.validated_data)
    return Response(serializer.errors, status=400)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def editar_tarea(request, pk):
    """ 
    """
    # Obtains the required task by primary key
    try:
        objeto = Tarea.objects.get(pk=pk)
    except Tarea.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Create the object if this has valid data
    serializer = serializers.TareaSerializer(objeto, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK)

    #if has a invalid data returns STATUS_HTTP_404
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def borrar_tarea(request, id):
    try:
        tarea = Tarea.objects.get(id=id, user=request.user)
        tarea.delete()
        return Response({'detail': 'tarea eliminada'})
    except Tarea.DoesNotExist:
        return Response({'detail': 'La tarea no existe papu'}, status=400)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def agregar_usuario(request):
    """
    Vista para agregar nuevos usuarios mediante
    la API
    """
    serializer = serializers.UserSerializer(data=request.data)
    if serializer.is_valid():
        if User.objects.filter(username = serializer.validated_data['username']).exists():
            # If the users had already sign up
            print('Error papu')
            context = {
                'detail': 'This user already exists'
            }
            return Response(context)

        user = serializer.save()
        token = Token.objects.create(user=user)
        auth_username = serializer.validated_data['username']
        auth_password = serializer.validated_data['password']
        user = authenticate(username=auth_username, password=auth_password)
        auth_log(request, user)
        context = {
            'detail': 'succes',
            'token': token.key
        }
        print(context)
        return Response(context)
    
    print(serializer.errors)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def iniciar_sesion(request):
    """_summary_

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    serializer = serializers.InicioSesionSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            auth_log(request, user)
            context = {
                'status': 'succes',
                'token': token.key,
                'creation-date': created
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({'status': False}, status=status.HTTP_401_UNAUTHORIZED)
    context = {
        'detail': serializer.errors
    }
    return Response(context)



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def desconectar_usuario(request):
    """
    Vista para cerrar la sesion del usuario
    y elimina el token
    """
    request.user.auth_token.delete()
    logout(request)
    context ={
        'detail': 'success'
        }
    return Response(context)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_pass(request):
    """_summary_
        Api view to change the pass of the user if this is
        in his account. Must be logged and authenticated with
        Token.

    Args:
        request (HTTP object): object with the HTTP data

    Returns:
        Response object:  JSON encode objects
    """
    actual = request.data.get("actual-pass")
    new_pass = request.data.get("new-pass")
    confirmation = request.data.get("confirm-pass")
    if not request.user.check_password(actual):
        return Response({"error": "incorrect password"}, status=status.HTTP_401_UNAUTHORIZED)
    elif new_pass != confirmation:
        return Response({"error": "passwords doesn't match"}, status=status.HTTP_400_BAD_REQUEST)
    elif new_pass == confirmation:
        request.user.set_password(new_pass)
        request.user.save()
        return Response({"message": "password change success"}, status=status.HTTP_200_OK)
    return Response({"error": "internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_data(request):
    """_summary_
        Api view that returns all the user data.

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    user = request.user
    context = {
        'id': user.id,
        'username': user.username
    }
    return Response(context)