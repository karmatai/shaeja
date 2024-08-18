from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Prayer

@registry.register_document
class PrayerDocument(Document):
    class Index:
        # Name of the Elasticsearch index
        name = 'prayers'

        # Settings for the Elasticsearch index
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0
        }

    class Django:
        model = Prayer  # The model associated with this document

        # The fields to be indexed
        fields = [
            'prayer_title',
            'prayer_content',
            'id'  # Add the ID field to the indexed document
        ]
    
    class Django:
        model = Prayer
        fields = [
            'prayer_title',
            'prayer_content',
            'id',  # Make sure 'id' is included
        ]

    # Add any custom fields if needed
    # For JSON fields, consider using a custom field type or custom method to handle them
    @property
    def prayer_pdf_urls(self):
        return self.instance.prayer_pdf_urls if self.instance else []

    @property
    def prayer_youtube_urls(self):
        return self.instance.prayer_youtube_urls if self.instance else []
    
    class Meta:
        # Ensure the custom methods are used in the document
        fields = {
            'pdf_urls': fields.TextField(attr='get_prayer_pdf_urls'),
            'youtube_urls': fields.TextField(attr='get_prayer_youtube_urls'),
        }