from django.db import models
from django.conf import settings

# Create your models here.
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
