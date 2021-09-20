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


class Measurement(models.Model):
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


class MeasurementMaterial(models.Model):
    """
    The weekly assessment amounts by material
    """
    measurement = models.ForeignKey(
        Measurement,
        on_delete=models.CASCADE,
        related_name='measurement_materials'
    )
    material = models.ForeignKey(Material, on_delete=models.PROTECT)

    amount = models.FloatField()
    units = models.CharField(max_length=10)


class Unit(models.Model):
    """
    Base units of weight
    """
    name = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=10)


class UserUnit(models.Model):
    """
    The unit type with weight, connected to user
    """
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    unit = models.ForeignKey(Unit, on_delete=models.SET_NULL, null=True)
    value = models.FloatField()

