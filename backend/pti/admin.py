from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Measurement)
admin.site.register(MeasurementMaterial)
admin.site.register(Material)
