from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Car_Dealer_Profile

class CarDealerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car_Dealer_Profile
        fields = ['business_name', 'state', 'street_name', 'zip_code', 'city', 'phone_number', 'business_email']

class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True)
    car_dealer_profile = CarDealerProfileSerializer()

    class Meta:
        model = User
        fields = ['username', 'password']
    
    def create(self, validated_data):
        # removes the password from object for security by hashing it
        password = validated_data.pop('password')
        
        # extract the car_dealer_profile model information
        car_dealer_profile_data = validated_data.pop('car_dealer_profile')
        
        # create the User instance with remaining data
        user = User.objects.create_user(**validated_data)
        
        # Create the Car_Dealer_Profile instance
        car_dealer_profile = Car_Dealer_Profile.objects.create(
            user=user,
            **car_dealer_profile_data
        )

        # Set password after creating the user
        user.set_password(password)
        user.save()

        return user



