from rest_framework import serializers
from .models import Meal

class TrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = '__all__'