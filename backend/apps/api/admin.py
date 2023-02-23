from django.contrib import admin

from .models import ClothingItem, ItemTag

# Register your models here.
admin.site.register(ClothingItem)
admin.site.register(ItemTag)