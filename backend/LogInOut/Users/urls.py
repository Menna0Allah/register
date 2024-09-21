from django.urls import path
from .views import loginView, logoutView, registerView, addView, notesView

urlpatterns = [
    path('login/', loginView, name='login'),
    path('logout/', logoutView, name='logout'),
    path('register/', registerView, name='register'),
    path('api/add/', addView, name='add'),
    path('api/notes', notesView, name='notes'),
]