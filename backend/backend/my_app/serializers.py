from rest_framework import serializers
from .models import Prayer

class PrayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prayer
        fields = ['id', 'prayer_title', 'prayer_content', 'prayer_pdf_urls', 'prayer_youtube_urls', 'view']

