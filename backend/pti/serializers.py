from rest_framework import serializers
from .models import Material, SignUp, WeeklyAssessment, WeeklyAssessmentMaterial


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignUp
        fields = (
            'user',
            'has_assessed_trash',
            'was_aware_of_municipality_program',
            'people_in_household',
        )


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = (
            'name',
            'description',
            'is_recyclable'
        )


class WeeklyAssessmentMaterialSerializer(serializers.ModelSerializer):
    material = MaterialSerializer(read_only=True)
    material_id = serializers.PrimaryKeyRelatedField(
        source='material',
        queryset=Material.objects.all(),
        write_only=True
    )

    class Meta:
        model = WeeklyAssessmentMaterial
        fields = (
            'material',
            'material_id',
            'amount',
            'units'
        )


class WeeklyAssessmentSerializer(serializers.ModelSerializer):
    weekly_materials = WeeklyAssessmentMaterialSerializer(many=True)
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = WeeklyAssessment
        fields = (
            'user',
            'date',
            'weekly_materials',
            'did_compost',
            'compost_reason',
            'did_reuse_items',
            'reused_items',
            'learned_this_week',
            'comments',
        )

    def create(self, validated_data):
        materials = validated_data.pop('weekly_materials')
        weekly_assessment = WeeklyAssessment.objects.create(**validated_data)
        for material in materials:
            WeeklyAssessmentMaterial.objects.create(
                weekly_assessment=weekly_assessment,
                **material
            )
        return weekly_assessment
