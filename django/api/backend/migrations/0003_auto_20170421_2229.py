# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-22 02:29
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_usersession'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usersession',
            old_name='epiration',
            new_name='expiration',
        ),
        migrations.AlterField(
            model_name='usersession',
            name='logged_in',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
    ]
