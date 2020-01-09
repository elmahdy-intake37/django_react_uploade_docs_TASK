from django.urls import path
from rest_framework.routers import DefaultRouter
from apps.documents.api.v1.views import DocumentViewSet

router = DefaultRouter()


router.register('document', DocumentViewSet, basename='documents')
# urlpatterns += router.urls

urlpatterns = router.urls
