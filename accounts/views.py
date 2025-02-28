from django.shortcuts import render
from rest_framework.generics import CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.views import APIView, Response
from .serializers import SignupSerializer, UpdateSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status

class SignupView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        try:
            car_dealer = serializer.save()
            return Response({"message": "Account created successfully", "Car Dealer": car_dealer.username}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetUserView(RetrieveAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = SignupSerializer

    def get(self, request, *args, **kwargs):
        try:
            instance = self.request.user  # Get the authenticated user
            # Check if the user has a car_dealer_profile associated with them
            if not hasattr(instance, 'car_dealer_profile'):
                return Response({"error": "Car dealer profile does not exist for this user."}, status=status.HTTP_400_BAD_REQUEST)
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteUserView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_user(self):
        return self.request.user
    
    def perform_destroy(self, instance):
        instance.delete()

    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_user()
            self.perform_destroy(instance)
            return Response({"message" : "Dealer profile removed"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateUserView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateSerializer

    def get_user(self):
        return self.request.user

    def perform_update(self, serializer):
        instance = serializer.save()
        return instance

    def put(self, request, *args, **kwargs):
        instance = self.get_user()
        serializer = self.get_serializer(instance, data=request.data, context={'request': request})
        
        if serializer.is_valid():
                updated_instance = serializer.save()
                return Response({"message": f'User: {updated_instance.username} updated successfully'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
