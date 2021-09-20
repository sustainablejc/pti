from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import Unit, User, UserUnit


class UnitTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='test user',
            email='test_user@test.com',
            password='test_user_password'
        )

        self.unit = Unit.objects.create(name='gallons', abbreviation='g')

    def test_create_unit(self):
        url = reverse('user-units-list')
        data = {
            'user': self.user.id,
            'unit_id': self.unit.id,
            'value': 5
        }

        client = APIClient()
        client.force_authenticate(user=self.user)

        response_create = client.post(url, data=data, format='json')

        response = self.client.get(url, format='json')

        import ipdb; ipdb.set_trace() # BREAKPOINT
        pass
