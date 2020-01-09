from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.users.models import Profile

def get_and_authenticate_user(username, password):
    user = authenticate(username=username, password=password)
    if user is None:
        raise serializers.ValidationError("Invalid username/password. Please try again!")
    return user


def create_user_account(email, password, first_name="",
                        last_name="", **extra_fields):
    user = get_user_model().objects.create_user(
        email=email, password=password, first_name=first_name,
        last_name=last_name, **extra_fields)
    return user

def create_profile_user(user, city=None, country=None, mobile=None, server_url=None,
                        **extra_fields):
    profile = Profile.objects.create(city=city,
                                     user=user,
                                     country=country, mobile=mobile,
                                     server_url=server_url,
                                     **extra_fields)
    return profile
