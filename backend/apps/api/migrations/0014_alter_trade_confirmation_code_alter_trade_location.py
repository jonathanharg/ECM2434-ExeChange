# Generated by Django 4.1.7 on 2023-03-09 14:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0013_alter_trade_confirmation_code_alter_trade_time"),
    ]

    operations = [
        migrations.AlterField(
            model_name="trade",
            name="confirmation_code",
            field=models.PositiveSmallIntegerField(default=2320, editable=False),
        ),
        migrations.AlterField(
            model_name="trade",
            name="location",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="api.location",
            ),
        ),
    ]
