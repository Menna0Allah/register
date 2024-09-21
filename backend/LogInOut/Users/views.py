from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .models import note

@csrf_exempt
def loginView(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'hehe': 'Login successful hehe','username': username,}, status=200)
        else:
            return JsonResponse({'ops': 'wrong username or password, if you do not have an account , make one ;)'}, status=400)

    # elif request.method == 'GET':
    #     users = User.objects.all()  
    #     userList = [{'username': user.username, 'password': user.password} for user in users]
    #     return JsonResponse(userList, safe=False, status=200)

    # write { the elif request.method == 'GET' } to get the user and password in api but it is not save
    # and already it will save in the admin , i can see them there and don't need to do that

    return JsonResponse({'ops': 'Only GET and POST requests are allowed'}, status=405)

@csrf_exempt
def registerView(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        try:
            user = User.objects.create_user(username=username, password=password)
            login(request, user)
            return JsonResponse({'hehe': 'Registration successful'}, status=201)
        except:
            return JsonResponse({'ops': 'Username already taken'}, status=400)
    return JsonResponse({'ops': 'Only POST requests are allowed'}, status=405)

@csrf_exempt
def logoutView(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'hehe': 'Logout successful'}, status=200)
    return JsonResponse({'ops': 'Only POST requests are allowed'}, status=405)

@csrf_exempt
def addView(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        x = note.objects.create(note=data['note'])
        xList = {'note':x.note}
        return JsonResponse(xList)

@csrf_exempt 
def notesView(request):
    if request.method == 'GET':
        x = note.objects.all()
        xList = [{'note':y.note}for y in x]
        return JsonResponse(xList,safe=False)