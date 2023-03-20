from apps.api.models import ClothingItem, ExeChangeUser, ItemTag, PendingTrade, Achievement
from django.contrib import admin

admin.site.register(ExeChangeUser)
admin.site.register(ClothingItem)
admin.site.register(ItemTag)
admin.site.register(PendingTrade)
admin.site.register(Achievement)
