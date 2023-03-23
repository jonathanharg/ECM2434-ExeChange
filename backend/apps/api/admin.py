from apps.api.models import (
    Achievement,
    ClothingItem,
    ExeChangeUser,
    ItemTag,
    Location,
    Trade,
)
from django.contrib import admin


class ShowID(admin.ModelAdmin):
    readonly_fields = ("id",)


class ShowConfirmationCode(admin.ModelAdmin):
    readonly_fields = ("id", "confirmation_code")


admin.site.register(ExeChangeUser, ShowID)
admin.site.register(ClothingItem, ShowID)
admin.site.register(ItemTag)
admin.site.register(Achievement)
admin.site.register(Trade, ShowConfirmationCode)
admin.site.register(Location)
