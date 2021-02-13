from rest_framework import generics, viewsets

from .serializers import MaterialSerializer, WeeklyAssessmentSerializer
from .models import Material, WeeklyAssessment


class WeeklyAssessmentView(viewsets.ModelViewSet):
    queryset = WeeklyAssessment.objects.all()
    serializer_class = WeeklyAssessmentSerializer

    def get(self, request):
        return super().get(request)

    def list(self, request):
        return super().list(request)


class MaterialList(generics.ListAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
