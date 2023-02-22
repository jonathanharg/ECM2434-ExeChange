# Generated by Django 4.1.7 on 2023-02-22 22:43

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="tag",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("tag", models.CharField(max_length=20)),
            ],
        ),
        migrations.DeleteModel(
            name="Tags",
        ),
        migrations.AlterField(
            model_name="clothingitem",
            name="tags",
            field=models.ManyToManyField(to="api.tag"),
        ),
    ]
