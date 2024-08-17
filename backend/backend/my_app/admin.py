# Register your models here.
from django.contrib import admin
from .models import Prayer

@admin.register(Prayer)
class PrayerAdmin(admin.ModelAdmin):
    list_display = ('prayer_title', 'view')
    search_fields = ('prayer_title',)
