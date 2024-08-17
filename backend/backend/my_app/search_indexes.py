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
        ]
