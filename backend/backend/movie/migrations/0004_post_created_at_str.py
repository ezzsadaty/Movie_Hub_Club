# Generated by Django 4.1.4 on 2023-03-20 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0003_rename_first_name_user_name_remove_user_last_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='created_at_str',
            field=models.CharField(blank=True, max_length=16, null=True),
        ),
    ]
