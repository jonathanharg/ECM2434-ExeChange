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
    hidden = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.caption


class Trade(models.Model):
    def generate_confirmation_code(self):
        return random.randint(1000, 9999)

    class TradeStatuses(models.TextChoices):
        PENDING = "P", _("Pending")  # No reply yet from giver
        REJECTED = "R", _("Rejected")  # Either giver/receiver declines/withdraws
        ACCEPTED = "A", _("Accepted")  # Both agreed to make the exechange
        COMPLETED = "C", _("Completed")  # Trade has been made completed

    status = models.CharField(
        max_length=1,
        choices=TradeStatuses.choices,
        default=TradeStatuses.PENDING,
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="trade_receiver",
    )
    giver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="trade_giver",
    )
    giver_giving = models.ManyToManyField(ClothingItem, related_name="trade_giving")
    receiver_exchanging = models.ManyToManyField(
        ClothingItem, related_name="trade_exchanging", blank=True
    )
    message = models.TextField(max_length=280, blank=True)
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE, blank=True, null=True
    )
    time = models.DateTimeField(blank=True, null=True)
    giver_there = models.BooleanField(default=False)
    receiver_there = models.BooleanField(default=False)
    confirmation_code = models.PositiveSmallIntegerField(
        default=generate_confirmation_code, editable=False
    )
    requested_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)


class ExeChangeUser(AbstractUser):
    is_verified = models.BooleanField(default=False)

    verification_code = models.CharField(max_length=50, default="1234")

    profile_level = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    # current_xp will get reset on a level up, [tbd]XP per level, a [tbd] number of xp per trade.
    current_xp = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    trades_completed = models.IntegerField(default=0)
    items_given = models.PositiveIntegerField(default=0)
    items_received = models.PositiveIntegerField(default=0)
    items_uploaded = models.PositiveIntegerField(default=0)
    items_removed = models.PositiveIntegerField(default=0)

    @property
    def item_ratio(self):
        return self.items_given - self.items_received
