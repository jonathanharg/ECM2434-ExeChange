# Generated by Django 4.1.7 on 2023-02-22 22:45

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_tag_delete_tags_alter_clothingitem_tags"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="tag",
            new_name="TagModel",
        ),
    ]
