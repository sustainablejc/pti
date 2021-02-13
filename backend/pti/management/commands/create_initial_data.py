import datetime
import random

from django.core.management.base import BaseCommand

from django.contrib.auth.models import User
from pti.models import Material, WeeklyAssessment, WeeklyAssessment, WeeklyAssessmentMaterial


class Command(BaseCommand):
    help = 'Create initial data points'

    def add_arguments(self, parser):
        parser.add_argument(
            '--materials',
            action='store_true',
            help='Create the initial materials'
        )
        parser.add_argument(
            '--user',
            action='store_true',
            help='Create a dummy user'
        )
        parser.add_argument(
            '--sample-data',
            action='store_true',
            help='Create sample data'
        )

    def handle(self, *args, **kwargs):
        if kwargs['materials']:
            self.create_materials()

        if kwargs['user']:
            self.create_user()

        if kwargs['sample_data']:
            self.create_sample_data()

    def create_materials(self):
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

    def create_user(self):
        self.user = User.objects.create(
            username='test user',
            email='test_user@test.com',
            password='test_user_password'
        )

    def create_sample_data(self):
        user = User.objects.first()

        glass = Material.objects.filter(name='glass').first()
        plastic = Material.objects.filter(name='plastic').first()
        nuclear_waste = Material.objects.filter(name='nuclear waste').first()

        start_date = datetime.datetime.strptime(
            '2021-02-03 15:00:00',
            '%Y-%m-%d %H:%M:%S'
        )

        # 4 weeks of data
        for i in range(4):
            date = (start_date
                - datetime.timedelta(weeks=i)
                + datetime.timedelta(days=random.randint(-2, 2))
            )
            weekly_assessment = WeeklyAssessment.objects.create(
                date=date,
                user=user,
                did_compost=True,
                did_reuse_items=True,
            )

            materials = WeeklyAssessmentMaterial.objects.bulk_create([
                WeeklyAssessmentMaterial(
                    weekly_assessment=weekly_assessment,
                    material=glass,
                    material_id=glass.id,
                    amount=random.randint(0, 5),
                    units='lbs'
                ), WeeklyAssessmentMaterial(
                    weekly_assessment=weekly_assessment,
                    material=plastic,
                    material_id=plastic.id,
                    amount=random.randint(0, 5),
                    units='lbs'
                ), WeeklyAssessmentMaterial(
                    weekly_assessment=weekly_assessment,
                    material=nuclear_waste,
                    material_id=nuclear_waste.id,
                    amount=random.randint(0, 5),
                    units='lbs'
                )
            ])
