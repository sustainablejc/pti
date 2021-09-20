from django.urls import path, include
from rest_framework import routers
from rest_framework.routers import DefaultRouter

from .views import MaterialList, MeasurementView, UserUnitView


router = DefaultRouter()
router.register(r'measurement', MeasurementView, basename='measurement')
router.register(r'user-units', UserUnitsView, basename='user-units')

urlpatterns = [
    path(r'', include(router.urls)),
    path('materials/', MaterialList.as_view(), name='materials'),
]
