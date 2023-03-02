from django.test import TestCase

# Create your tests here.

import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from product.models import Product, Category
from order.models import Order, Payment
from users.models import User
from order.serializer import AllOrderSerializer

# initialize the APIClient app
client = Client()


class GetAllOrdersTest(TestCase):
    """ Test module for GET all Customers API """

    def setUp(self):
        category_setup = Category.objects.create(category_id="food_manufacturing",
                                                 category_name="Производство продуктов питания")
        nescafe_setup = Product.objects.create(
            product_Id=1, product_Name="Nescafe", product_Ticker="Nescf", product_Description="good one",
            product_category=category_setup, product_Price=2.5
        )
        coca_cola_setup = Product.objects.create(
            product_Id=2, product_Name="Coca Cola", product_Ticker="CC", product_Description="nice water",
            product_category=category_setup, product_Price=2
        )
        andy_setup = User.objects.create(first_Name="Andy", last_Name="Garfied",
                                         email="andy11@gmail.com", type='CUSTOMER')
        andies_payment_setup = Payment.objects.create(payment_Type="Credit Card", amount_Paid=150)
        order_setup = Order.objects.create(customer=andy_setup, destination_email="maks.dvornik.2016@mail.ru",
                                           payment=andies_payment_setup, total_Amount=150,
                                           note="my first order here")
        order_setup.products.set((nescafe_setup, coca_cola_setup))

    def test_get_all_orders(self):
        # get API response
        response = client.get(reverse('order:getAllOrder'))
        # get data from db
        orders = Order.objects.all()
        serializer = AllOrderSerializer(orders, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class DeleteSingleOrderTest(TestCase):
    """ Test module for deleting an existing Order record """

    def setUp(self):
        category_setup = Category.objects.create(category_id="food_manufacturing",
                                                 category_name="Производство продуктов питания")
        nescafe_setup = Product.objects.create(
            product_Id=1, product_Name="Nescafe", product_Ticker="Nescf", product_Description="good one",
            product_category=category_setup, product_Price=2.5
        )
        coca_cola_setup = Product.objects.create(
            product_Id=2, product_Name="Coca Cola", product_Ticker="CC", product_Description="nice water",
            product_category=category_setup, product_Price=2
        )
        andy_setup = User.objects.create(first_Name="Andy", last_Name="Garfied",
                                         email="andy11@gmail.com", type='CUSTOMER')
        andies_payment_setup = Payment.objects.create(payment_Type="Credit Card", amount_Paid=150)
        self.order_setup = Order.objects.create(customer=andy_setup, destination_email="maks.dvornik.2016@mail.ru",
                                           payment=andies_payment_setup, total_Amount=150,
                                           note="my first order here")
        self.order_setup.products.set((nescafe_setup, coca_cola_setup))

    def test_valid_delete_order(self):
        response = client.delete(
            reverse('order:deleteOrder', kwargs={'pk': self.order_setup.pk}))
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)

    def test_invalid_delete_order(self):
        response = client.delete(
            reverse('order:deleteOrder', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)