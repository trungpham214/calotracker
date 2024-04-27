from django.shortcuts import render, redirect
from .models import Ingredient

from django.contrib.auth.models import User, auth
from django.contrib import messages


# Create your views here.
def home(request):
    ingres = Ingredient.objects.all()
    return render(request, 'home.html', {'ingres' : ingres})

def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        if User.objects.filter(username=username).exists():
            messages.info(request, "Username exists")
            return redirect('register')
        else:
            user = User.objects.create_user(username=username, password=password)
            user.save()
            return redirect('login')
    else:
        return render(request, 'register.html')

def login(request):

    
    return render(request, 'login.html')