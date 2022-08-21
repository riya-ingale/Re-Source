from ResourceApp.models import Book_slots, Cart, ProductInOrder, Transaction, Order
from rest_framework import serializers
from Institutes.models import *

class BookslotSeializer(serializers.ModelSerializer):
    class Meta:
        model = Book_slots
        fields = '__all__'

class ResourcesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resources
        fields = '__all__'
        # exclude = ['lab']
    

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class PIOSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInOrder
        fields = '__all__'



