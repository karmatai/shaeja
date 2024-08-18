from rest_framework import generics
from .models import Prayer
from .serializers import PrayerSerializer
from django.http import JsonResponse
from django.views import View
#from django_elasticsearch_dsl.search import Search
#from .search_indexes import PrayerDocument
import re

class PrayerListCreate(generics.ListCreateAPIView):
    queryset = Prayer.objects.all()
    serializer_class = PrayerSerializer

class PrayerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Prayer.objects.all()
    serializer_class = PrayerSerializer

class SearchPrayerView(View):
    import re
from django.http import JsonResponse
from fuzzywuzzy import fuzz
from django.views import View

class SearchPrayerView(View):
    def remove_special_symbols(self, text):
        # Remove Tibetan symbols ་ and ། and spaces
        return re.sub(r'[་།\s]', '', text)
    
    

    def get(self, request, *args, **kwargs):
        query = request.GET.get('phrase', '').strip()

        if not query:
            return JsonResponse([], safe=False, json_dumps_params={'ensure_ascii': False})

        # Clean the query by removing special symbols and spaces
        cleaned_query = self.remove_special_symbols(query)

        # Retrieve all prayers and remove special symbols from prayer_content
        prayers = Prayer.objects.all()
        filtered_prayers = []

        for prayer in prayers:
            cleaned_prayer_content = self.remove_special_symbols(prayer.prayer_content)

            # Perform a case-insensitive contains search
            if cleaned_query in cleaned_prayer_content:
                filtered_prayers.append(prayer)

        # Format results
        formatted_results = [
            {
                'id': prayer.id,
                'title': prayer.prayer_title,
                'pdf_urls': prayer.prayer_pdf_urls,
                'youtube_urls': prayer.prayer_youtube_urls,
                'img_url': prayer.img_url
            } for prayer in filtered_prayers
        ]

        return JsonResponse(formatted_results, safe=False, json_dumps_params={'ensure_ascii': False})

# class SearchPrayerView(View):
#     def get(self, request, *args, **kwargs):
        
#         query = request.GET.get('phrase', '')
        
#         search = PrayerDocument.search().query('fuzzy', prayer_content={
#             'value': query,
#             'fuzziness': 'auto'
#         })
        
#         try:
#             response = search.execute()
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)
        
#         results = [
#             {
#                 'id': hit.id,
#                 'title': hit.prayer_title,
#                 'pdf_urls': hit.prayer_pdf_urls,
#                 'youtube_urls': hit.prayer_youtube_urls,
#                 'score': hit.meta.score,
#             } for hit in response if hit.meta.score > 0.5
#         ]
#         print(results)
        
#         return JsonResponse(results, safe=False)