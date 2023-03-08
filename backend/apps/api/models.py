# Create your models here.

from uuid import uuid4

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class ItemTag(models.Model):
    value = models.CharField(max_length=20, unique=True)

    def __str__(self) -> str:
        return self.value


class Location(models.Model):
    value = models.CharField(max_length=20, unique=True)

    def __str__(self) -> str:
        return self.value


class ClothingItem(models.Model):
    # Ignore the argument since Django errors without a filename variable.
    def image_post_path(self, filename: str) -> str:  # pylint: disable=unused-argument
        return f"posts/{uuid4().hex}"

    caption = models.CharField(max_length=100)
    image = models.ImageField(upload_to=image_post_path)
    tags = models.ManyToManyField(ItemTag)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=None,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    in_pending_trade = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.caption


class TradeRequest(models.Model):
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="trade_request_from")
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="trade_request_to")
    giving = models.ManyToManyField(ClothingItem, related_name="trade_request_giving")
    receiving = models.ManyToManyField(ClothingItem, related_name="trade_request_receiving")
    from_location = models.ManyToManyField(Location)

# class UserOffering():
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     items = models.ManyToManyField(ClothingItem)
#     locations = models.ManyToManyField(Location)
#     days = models.ManyToManyField(models.DateField)
#     times = models.ManyToManyField(models.TimeField)

# class TradeRequest(models.Model):
#     requester = models.ForeignKey(UserOffering)
#     responder = models.ForeignKey(UserOffering)


class PendingTrade(models.Model):
    initiator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=None,
        related_name="initiator",
    )

    acceptor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=None,
        related_name="acceptor",
    )

    location = models.CharField(max_length=255)

    time = models.CharField(max_length=255)

    date = models.DateTimeField()

    item = models.ForeignKey(
        ClothingItem,
        on_delete=models.CASCADE,
        default=None,
    )


class ExeChangeUser(AbstractUser):
    profile_level = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    # current_xp will get reset on a level up, [tbd]XP per level, a [tbd] number of xp per trade.
    current_xp = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
