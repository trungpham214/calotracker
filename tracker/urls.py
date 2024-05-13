from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

#URLConf
urlpatterns = [
    path('', views.home, name='home'),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('send', views.send, name='send'),
    path('delete', views.delete, name='delete'),
    path('getmeal', views.get_meal, name='getmeal'),
]

urlpatterns = format_suffix_patterns(urlpatterns)