from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Car_Dealer_Profile

class CarDealerProfileSerializer(serializers.ModelSerializer):
    business_name = serializers.CharField(required=False)
    state = serializers.CharField(required=False)
    street_name = serializers.CharField(required=False)
    zip_code = serializers.CharField(required=False)
    city = serializers.CharField(required=False)
    phone_number = serializers.CharField(required=False)
    business_email = serializers.CharField(required=False)
    
    class Meta:
        model = Car_Dealer_Profile
        fields = ['business_name', 'state', 'street_name', 'zip_code', 'city', 'phone_number', 'business_email']

# sign up serializer requires all fields for input
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

class UpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True, required=False)
    car_dealer_profile = CarDealerProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['username', 'password', 'car_dealer_profile']

    def update(self, instance, validated_data):
        # Extract the car_dealer_profile data from validated data (if present)
        car_dealer_profile_data = validated_data.pop('car_dealer_profile', None)

        # Update the User fields if present in the validated data
        if 'username' in validated_data:
            instance.username = validated_data['username']
        
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])

        # Save the updated User instance
        instance.save()

        # If car_dealer_profile data is provided, update the Car_Dealer_Profile
        if car_dealer_profile_data:
            # Update or create the related Car_Dealer_Profile
            car_dealer_profile = instance.car_dealer_profile
            for key, value in car_dealer_profile_data.items():
                setattr(car_dealer_profile, key, value)
            car_dealer_profile.save()

        return instance


