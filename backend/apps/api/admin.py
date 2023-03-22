from apps.api.models import (
    Achievement,
    ClothingItem,
    ExeChangeUser,
    ItemTag,
    PendingTrade,
)
from django.contrib import admin

admin.site.register(ExeChangeUser)
admin.site.register(ClothingItem)
admin.site.register(ItemTag)
admin.site.register(PendingTrade)
admin.site.register(Achievement)
