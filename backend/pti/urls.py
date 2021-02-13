from django.urls import path, include
from rest_framework import routers
from rest_framework.routers import DefaultRouter

from .views import MaterialList, WeeklyAssessmentView


router = DefaultRouter()
router.register(r'weekly-assessment', WeeklyAssessmentView, basename='weekly-assessment')


urlpatterns = [
    path(r'', include(router.urls)),
    path('materials/', MaterialList.as_view(), name='materials'),
]
