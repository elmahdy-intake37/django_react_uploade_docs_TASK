from django.db import models
from apps.users.models import Profile
# Create your models here.
from django.utils.translation import ugettext_lazy as _
import uuid


def document_path(instance, filename):
    """
    Creates path for photos from the Course model
    """
    return 'application/documents/{0}'.format(filename)

class Document(models.Model):
    document_no = models.UUIDField(_('Document Number'), default=uuid.uuid4)
    terms =  models.TextField(blank=True, default="")
    users = models.ForeignKey(Profile, verbose_name=_('Document Client '),
                              related_name='documents_clients',
                              on_delete=models.CASCADE)
    title =  models.CharField(_("title"), max_length=128)
    description = models.TextField(blank=True, default="")
    document_path = models.FileField(_('documents'), upload_to=document_path)
