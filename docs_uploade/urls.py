from django.contrib import admin
from django.urls import path, include
from rest_framework_swagger.views import get_swagger_view
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_swagger_view(title='Elham API Documentation')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('apps.users.api.v1.urls')),
    path('api/v1/docs/', schema_view),
    path('api/v1/', include('apps.documents.api.v1.urls')),

] + static(settings.MEDIA_URL,
           document_root=settings.MEDIA_ROOT)
