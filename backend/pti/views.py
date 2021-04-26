from rest_framework import generics, viewsets

from .serializers import MaterialSerializer, WeeklyAssessmentSerializer
from .models import Material, WeeklyAssessment


class WeeklyAssessmentView(viewsets.ModelViewSet):
    queryset = WeeklyAssessment.objects.all()
    serializer_class = WeeklyAssessmentSerializer

    def get_queryset(self):
        return WeeklyAssessment.objects.filter(user=self.request.user.id).all()

    def perform_create(self, serializer):
        user = self.request.user
        return serializer.save(user=user)


class MaterialList(generics.ListAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
