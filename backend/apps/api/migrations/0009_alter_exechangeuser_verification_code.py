# Generated by Django 4.1.7 on 2023-03-22 16:07

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0008_alter_exechangeuser_verification_code"),
    ]

    operations = [
        migrations.AlterField(
            model_name="exechangeuser",
            name="verification_code",
            field=models.CharField(default="1234", max_length=50),
        ),
    ]