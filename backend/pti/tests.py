from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase
from .models import Material, WeeklyAssessment, User


class WeeklyAssessmentTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='test user',
            email='test_user@test.com',
            password='test_user_password'
        )

        Material.objects.bulk_create([
            Material(
                name='glass',
                description='This is glass',
                is_recyclable=True
            ),
            Material(
                name='plastic',
                description='This is plastic',
                is_recyclable=True
            ),
            Material(
                name='nuclear waste',
                description='This is nuclear waste',
                is_recyclable=False
            )
        ])

    def test_create_weekly_assessment(self):
        url = reverse('weekly-assessment-list')

        materials = Material.objects.all()

        """
        data = {
            'user': self.user.id,
            #'date',
            'weekly_materials': [
                {
                    'material_id': 1,
                    'amount': 1,
                    'units': 'lbs'
                },
                {
                    'material_id': 2,
                    'amount': 3,
                    'units': 'lbs'
                }
            ],
            'did_compost': True,
            'compost_reason': None,
            'did_reuse_items': False,
            'reused_items': None,
            'learned_this_week': None,
            'comments': None,
        }
        """
        data = {
            'user': self.user.id,
            #'date',
            'weeklyMaterials': [
                {
                    'materialId': 1,
                    'amount': 1,
                    'units': 'lbs'
                },
                {
                    'materialId': 2,
                    'amount': 3,
                    'units': 'lbs'
                }
            ],
            'didCompost': True,
            'compostReason': None,
            'didReuseItems': False,
            'reusedItems': None,
            'learnedThisWeek': None,
            'comments': None,
        }

        response_create = self.client.post(url, data=data, format='json')

        response = self.client.get(url, format='json')
        # these two should be the same
        weekly_assessments_json = response.json()
        weekly_assessments = WeeklyAssessment.objects.all()

        import ipdb; ipdb.set_trace() # BREAKPOINT
        pass
