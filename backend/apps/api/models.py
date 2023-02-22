from django.db import models

# Create your models here.


class Tags(models.Model):
    pass


class ClothingItem(models.Model):
    # TODO: add image field and tag field
    caption = models.CharField(max_length=100)
    tags = models.ManyToManyField(Tags)

    def __str__(self):
        return self.caption


class ClothingOwner(models.Model):
    username = models.CharField(max_length=200)
    email = models.EmailField()
    items = models.ManyToManyField(
        ClothingItem
    )  # A clothing owner can post many clothing items

    def __str__(self):
        return self.username
