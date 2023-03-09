from apps.api.models import (
    ClothingItem,
    ExeChangeUser,
    ItemTag,
    Location,
    Trade,
    TradeRequest,
)
from django.contrib import admin


class ShowID(admin.ModelAdmin):
    readonly_fields = ("id",)


class ShowConfirmationCode(admin.ModelAdmin):
    readonly_fields = ("id", "confirmation_code")


admin.site.register(ExeChangeUser, ShowID)
admin.site.register(ClothingItem, ShowID)
admin.site.register(ItemTag)
admin.site.register(TradeRequest)
admin.site.register(Trade, ShowConfirmationCode)
admin.site.register(Location)
