# Generated by Django 4.1.7 on 2023-03-21 17:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0022_clothingitem_hidden_alter_trade_confirmation_code"),
    ]

    operations = [
        migrations.AlterField(
            model_name="trade",
            name="confirmation_code",
            field=models.PositiveSmallIntegerField(default=6300, editable=False),
        ),
    ]
