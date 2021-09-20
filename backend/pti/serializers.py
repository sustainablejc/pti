from rest_framework import serializers
from .models import BaseUnit, Material, SignUp, Measurement, MeasurementMaterial, Unit, UserUnit


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


class MeasurementMaterialSerializer(serializers.ModelSerializer):
    material = MaterialSerializer(read_only=True)
    material_id = serializers.PrimaryKeyRelatedField(
        source='material',
        queryset=Material.objects.all(),
        write_only=True
    )

    class Meta:
        model = MeasurementMaterial
        fields = (
            'material',
            'material_id',
            'amount',
            'units'
        )


class MeasurementSerializer(serializers.ModelSerializer):
    materials = MeasurementMaterialSerializer(many=True)
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Measurement
        fields = (
            'user',
            'date',
            'materials',
            'did_compost',
            'compost_reason',
            'did_reuse_items',
            'reused_items',
            'learned_this_week',
            'comments',
        )

    def create(self, validated_data):
        materials = validated_data.pop('materials')
        measurement = Measurement.objects.create(**validated_data)
        for material in materials:
            MeasurementMaterial.objects.create(
                measurement=measurement,
                **material
            )
        return measurement


class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = "__all__"


class UserUnitSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    unit = UnitSerializer(many=False, read_only=True)
    unit_id = serializers.PrimaryKeyRelatedField(
        source='unit',
        queryset=Unit.objects.all(),
        write_only=True
    )

    class Meta:
        model = Unit
        fields = (
            'user',
            'name',
            'value',
            'unit',
            'unit_id',
        )
