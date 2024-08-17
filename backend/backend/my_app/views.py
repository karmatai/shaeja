from rest_framework import generics
from .models import Prayer
from .serializers import PrayerSerializer
from django.http import JsonResponse
from django.views import View
from django_elasticsearch_dsl.search import Search
from .search_indexes import PrayerDocument

class PrayerListCreate(generics.ListCreateAPIView):
    queryset = Prayer.objects.all()
    serializer_class = PrayerSerializer

class PrayerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Prayer.objects.all()
    serializer_class = PrayerSerializer

class SearchPrayerView(View):
    def get(self, request, *args, **kwargs):
        
        query = request.GET.get('phrase', '')
        
        search = PrayerDocument.search().query('fuzzy', prayer_content={
            'value': query,
            'fuzziness': 'auto'
        })
        
        try:
            response = search.execute()
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
        results = [
            {
                'title': hit.prayer_title,
                'pdf_urls': hit.prayer_pdf_urls,
                'youtube_urls': hit.prayer_youtube_urls,
                'score': hit.meta.score,
            } for hit in response
        ]
        
        return JsonResponse(results, safe=False)