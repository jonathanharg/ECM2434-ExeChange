from apps.api.models import (
    ClothingItem,
    ExeChangeUser,
    ItemTag,
    Location,
    PendingTrade,
    TradeRequest,
)
from django.contrib import admin

class ShowID(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(ExeChangeUser, ShowID)
admin.site.register(ClothingItem, ShowID)
admin.site.register(ItemTag)
admin.site.register(PendingTrade)
admin.site.register(TradeRequest)
admin.site.register(Location)
