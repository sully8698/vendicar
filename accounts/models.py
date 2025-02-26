from django.db import models
from django.core.validators import EmailValidator
from django.contrib.auth.models import User


class Car_Dealer_Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) #the usersername of the business account, business_user_name
    business_name = models.CharField(max_length=100)
    state = models.CharField(max_length=100, validators=[])
    street_name = models.CharField(max_length=100, )
    zip_code = models.CharField(max_length=5, )
    city = models.CharField(max_length=100, )
    phone_number = models.CharField(max_length=11, )
    business_email = models.CharField(max_length=200, unique=True, default=None, validators=[EmailValidator()])
    account_id = models.OneToOneField('self', null=True, blank=True, on_delete=models.SET_NULL)

    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.business_name}, address: {self.street_name}, {self.city} {self.state}, {self.zip_code}, Account ID: {self.account_id}'
