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

    def __str__(self) -> str:
        return self.caption

class PendingTrade(models.Model):
    """
    Initiator: This is the person who has requested the trade.

    Acceptor: The person who has accepted the trade.
    """
    initiator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=None,
    )
    acceptor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=None,
    )

    initiator_items = models.ManyToManyField(ClothingItem, on_delete=models.CASCADE, default=None)
    acceptor_items = models.ManyToManyField(ClothingItem, on_delete=models.CASCADE, default=None)

    initiator_verification = models.BooleanField(default=False)
    acceptor_verification = models.BooleanField(default=False)



class ExeChangeUser(AbstractUser):
    profile_level = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    # current_xp will get reset on a level up, [tbd]XP per level, a [tbd] number of xp per trade.
    current_xp = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
