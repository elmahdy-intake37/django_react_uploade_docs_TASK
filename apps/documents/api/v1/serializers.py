from rest_framework import serializers
from apps.documents.models import Document



class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__' 
