from rest_framework import generics
from .models import Prayer
from .serializers import PrayerSerializer
from django.http import JsonResponse
from django.views import View
from fuzzywuzzy import fuzz

class PrayerListCreate(generics.ListCreateAPIView):
    queryset = Prayer.objects.all()
    serializer_class = PrayerSerializer

class PrayerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Prayer.objects.all()
    serializer_class = PrayerSerializer

class SearchPrayerView(View):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('phrase', '').strip().lower()
        
        # Fetch all prayers
        prayers = Prayer.objects.all()
        
        results = []
        for prayer in prayers:
            # Calculate the similarity score between the query and prayer content
            similarity = fuzz.partial_ratio(query, prayer.prayer_content.lower())
            
            if similarity >= 90:  # Adjust this threshold as needed
                results.append({
                    'title': prayer.prayer_title,
                    'pdf_urls': prayer.prayer_pdf_urls,
                    'youtube_urls': prayer.prayer_youtube_urls,
                    'similarity': similarity,  # Optional: include similarity score in the response
                })
        
        # Sort results by similarity score (optional)
        results = sorted(results, key=lambda x: x['similarity'], reverse=True)
        
        return JsonResponse(results, safe=False)
