from django.db import models

# Create your models here.

class ItemTag(models.Model):
    tag = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return self.tag

class ClothingItem(models.Model):
    # TODO: add image field
    caption = models.CharField(max_length=100)
    tags = models.ManyToManyField(ItemTag)
    def __str__(self):
        return self.caption

