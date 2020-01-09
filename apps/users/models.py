from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User,null=True, on_delete=models.CASCADE)
    company = models.CharField(_("Company"), max_length=128)
    server_url = models.URLField(_('Server url'), null=True)
    mobile = PhoneNumberField(_('Mobile'), help_text=('with country code (eg. +48)'), blank=True, null=True)
    country = models.CharField(_("Country"), max_length=64, default="Germany")
    city = models.CharField(_("city"), max_length=64, default="Düsseldorf")
