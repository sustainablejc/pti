import datetime
from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class SignUp(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    has_assessed_trash = models.BooleanField()
    was_aware_of_municipality_program = models.BooleanField()
    people_in_household = models.IntegerField()


class Material(models.Model):
    """
    A material that is part of the waste audit
    """
    name = models.CharField(max_length=100)
    description = models.TextField()
    is_recyclable = models.BooleanField()


class WeeklyAssessment(models.Model):
    """
    Placeholder for the weekly PTI assessments
    """
    date = models.DateTimeField(default=datetime.datetime.now, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, unique_for_date='date')

    did_compost = models.BooleanField()
    compost_reason = models.TextField(blank=True, null=True)

    did_reuse_items = models.BooleanField()
    reused_items = models.TextField(blank=True, null=True)

    learned_this_week = models.TextField(blank=True, null=True)

    comments = models.TextField(blank=True, null=True)


class WeeklyAssessmentMaterial(models.Model):
    """
    The weekly assessment amounts by material
    """
    weekly_assessment = models.ForeignKey(
        WeeklyAssessment,
        on_delete=models.CASCADE,
        related_name='weekly_materials'
    )
    material = models.ForeignKey(Material, on_delete=models.PROTECT)

    amount = models.FloatField()
    units = models.CharField(max_length=10)

