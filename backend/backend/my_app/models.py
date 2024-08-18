from django.db import models

class Prayer(models.Model):
    prayer_title = models.CharField(max_length=200)
    prayer_content = models.TextField()
    prayer_pdf_urls = models.JSONField(blank=True, null=True)  # Store multiple PDF URLs as a JSON array
    prayer_youtube_urls = models.JSONField(blank=True, null=True) # For a single URL; use ArrayField if multiple URLs are needed
    view = models.PositiveIntegerField(default=0)  # Integer field to count views
    img_url = models.CharField(max_length=200,default=None)

    def __str__(self):
        return self.prayer_title
