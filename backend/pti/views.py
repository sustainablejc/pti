from rest_framework import generics, viewsets
from rest_framework.response import Response

from .serializers import MaterialSerializer, MeasurementSerializer
from .models import Material, Measurement, UserUnit


class MeasurementView(viewsets.ModelViewSet):
    queryset = Measurement.objects.all()
    serializer_class = MeasurementSerializer

    def get_queryset(self):
        return Measurement.objects.filter(user=self.request.user.id).all()

    def perform_create(self, serializer):
        user = self.request.user
        return serializer.save(user=user)


class MaterialList(generics.ListAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer


class UserUnitView(viewsets.ViewSet):
    """
    A viewset around user setting information.
    """

    def list(self, request):
        import ipdb; ipdb.set_trace() # BREAKPOINT
        pass


    def create(self, request):
        import ipdb; ipdb.set_trace() # BREAKPOINT
        pass
