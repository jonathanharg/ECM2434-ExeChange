# Generated by Django 4.1.7 on 2023-03-09 14:24

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0012_trade_message_alter_trade_confirmation_code_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="trade",
            name="confirmation_code",
            field=models.PositiveSmallIntegerField(default=7496, editable=False),
        ),
        migrations.AlterField(
            model_name="trade",
            name="time",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
