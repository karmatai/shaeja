from rest_framework import generics
from .models import Prayer
from .serializers import PrayerSerializer
from django.http import JsonResponse
from django.views import View
#from django_elasticsearch_dsl.search import Search
#from .search_indexes import PrayerDocument

class PrayerListCreate(generics.ListCreateAPIView):
    queryset = Prayer.objects.all()
    serializer_class = PrayerSerializer

class PrayerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Prayer.objects.all()
    serializer_class = PrayerSerializer

class SearchPrayerView(View):
    def get(self, request, *args, **kwargs):
        
        query = request.GET.get('phrase', '')
        
        # Perform the search using Django ORM
        results = Prayer.objects.filter(
            prayer_content__icontains=query
        ).values(
            'id',
            'prayer_title',
            'prayer_pdf_urls',
            'prayer_youtube_urls',
            'img_url',
        )
        
        # Format results
        formatted_results = [
            {
                'id': result['id'],
                'title': result['prayer_title'],
                'pdf_urls': result['prayer_pdf_urls'],
                'youtube_urls': result['prayer_youtube_urls'],
                'img_url': result['img_url']
            } for result in results
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