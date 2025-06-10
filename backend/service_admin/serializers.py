from rest_framework import serializers
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(write_only=True) # Renamed to lowercase for consistency, though not strictly required

    class Meta:
        model = User
        fields = ["username", "password", "password2"] # FIX 1: 'username' all lowercase


    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Password must match")
        return data 

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'], 
            password=validated_data['password'])
        return user
        