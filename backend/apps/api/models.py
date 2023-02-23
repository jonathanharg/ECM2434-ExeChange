from django.conf import settings
from django.db import models

# Create your models here.


class ItemTag(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class ClothingItem(models.Model):
    # TODO: add image field
    caption = models.CharField(max_length=100)
    tags = models.ManyToManyField(ItemTag)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=None,
    )

    def __str__(self):
        return self.caption
