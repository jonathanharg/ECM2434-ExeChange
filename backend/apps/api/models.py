# Create your models here.

import random
from uuid import uuid4

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _


class ItemTag(models.Model):
    value = models.CharField(max_length=20, unique=True)

    def __str__(self) -> str:
        return self.value


class Location(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self) -> str:
        return self.name


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
    description = models.TextField(max_length=280)

    in_pending_trade = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.caption


class TradeRequest(models.Model):
    class TradeRequestStatuses(models.TextChoices):
        PENDING = "P", _("Pending")
        REJECTED = "R", _("Rejected")

    status = models.CharField(
        max_length=1,
        choices=TradeRequestStatuses.choices,
        default=TradeRequestStatuses.PENDING,
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="trade_request_receiver",
    )
    giver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="trade_request_giver",
    )
    items = models.ManyToManyField(ClothingItem, related_name="trade_request_items")
    message = models.TextField(max_length=280)


class Trade(models.Model):
    class TradeStatuses(models.TextChoices):
        UPCOMING = "U", _("Upcoming")
        REJECTED = "R", _("Rejected")
        ACCEPTED = "A", _("Accepted")

    status = models.CharField(
        max_length=1,
        choices=TradeStatuses.choices,
        default=TradeStatuses.UPCOMING,
    )
    giver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="trade_giver",
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="trade_receiver",
    )
    giver_giving = models.ManyToManyField(ClothingItem, related_name="trade_giving")
    receiver_exchanging = models.ManyToManyField(
        ClothingItem, related_name="trade_exchanging"
    )
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    time = models.DateTimeField()
    giver_there = models.BooleanField(default=False)
    receiver_there = models.BooleanField(default=False)
    confirmation_code = models.PositiveSmallIntegerField(
        default=random.randint(1000, 9999)
    )  # Editable=false
    # from_days = models.DateField
    # # BUGGED: TODO: BROKEN: FIXME: JANK: make this an array
    # from_times = models.TimeField


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
