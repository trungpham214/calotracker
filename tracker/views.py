from django.shortcuts import render, redirect
from .models import Ingredient, Meal
from django.http import HttpResponse

from django.contrib.auth.models import User, auth
from django.contrib import messages

from django.http import JsonResponse
from .serializers import TrackerSerializer

# Create your views here.
def home(request):
    ingres = Ingredient.objects.all()
    meals = Meal.objects.all()
    return render(request, 'home.html', {
        'ingres' : ingres,
        'meals' : meals
    
    })

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
            auth.login(request, user)
            return redirect('/')
    else:
        return render(request, 'register.html')

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request, 'User not exists. Please sign up!')
            return redirect('login')
    else:    
        return render(request, 'login.html')
    

def logout(request):
    auth.logout(request)
    return redirect('/')

def send(request):
    user = request.POST['user']
    date = request.POST['date']
    type = request.POST['type']
    calo = request.POST['calo']
    carb = request.POST['carb']
    fat = request.POST['fat']
    protein = request.POST['protein']

    new_meal = Meal.objects.create(
        user=user,
        date=date,
        type=type,
        calo=calo,
        carb=carb,
        fat=fat,
        protein=protein
    )
    new_meal.save()
    
    # return HttpResponse(f'You added {calo} calories meal')
    return redirect('/')


def delete(request):
    mealid = request.POST['meal-id']

    Meal.objects.filter(id=mealid).delete()

    return redirect('/')

def get_meal(request, format=None):
    #get all the meals
    #serialize the meals
    #return json response
    meals = Meal.objects.all()
    serializer = TrackerSerializer(meals, many=True)
    return JsonResponse({'meals': serializer.data})
