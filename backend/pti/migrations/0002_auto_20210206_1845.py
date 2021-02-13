# Generated by Django 3.1.6 on 2021-02-06 18:45

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pti', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Material',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('is_recyclable', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='WeeklyAssessment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('did_compost', models.BooleanField()),
                ('compost_reason', models.TextField()),
                ('did_reuse_items', models.BooleanField()),
                ('reused_items', models.TextField()),
                ('learned_this_week', models.TextField()),
                ('comments', models.TextField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, unique_for_date='date')),
            ],
        ),
        migrations.CreateModel(
            name='WeeklyAssessmentMaterial',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
                ('units', models.CharField(max_length=10)),
                ('material', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='pti.material')),
                ('weekly_assessment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='weekly_materials', to='pti.weeklyassessment')),
            ],
        ),
        migrations.DeleteModel(
            name='Weekly',
        ),
    ]