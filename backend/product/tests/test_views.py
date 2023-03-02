from django.test import TestCase

# Create your tests here.

import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from product.models import Product
from product.serializer import ProductSerializer, ProductAddingSerializer
from product.models import Category

# initialize the APIClient app
client = Client()


class GetAllProductsTest(TestCase):
    """ Test module for GET all Product API """

    def setUp(self):
        category_setup = Category.objects.create(category_id="food_manufacturing",
                                                 category_name="Производство продуктов питания")
        Product.objects.create(
            product_Id=1, product_Name="Nescafe", product_Ticker="Nescf", product_Description="good one",
            product_category=category_setup, product_Price=2.5
        )
        Product.objects.create(
            product_Id=2, product_Name="Coca Cola", product_Ticker="CC", product_Description="nice water",
            product_category=category_setup, product_Price=2
        )

    def test_get_all_products(self):
        # get API response
        response = client.get(reverse('product:getAllproduct'))
        # get data from db
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class CreateNewProductTest(TestCase):
    """ Test module for inserting a new product """

    def setUp(self):
        Category.objects.create(category_id="it_companies",
                                category_name="IT-компании")
        self.valid_payload = {
            'product_Id': 1,
            'product_Name': "Google",
            'product_Ticker': 'GGL',
            'product_Description': 'just a google)',
            "category_id": "it_companies",
            "category_name": "IT-компании",
            "product_Price": 100
        }
        self.invalid_payload = {
            'product_Id': 1,
            'product_Name': "",
            'product_Ticker': 'GGL',
            'product_Description': 'just a google)',
            "category_id": "it_companies",
            "category_name": "IT-компании",
            "product_Price": 100
        }

    def test_create_valid_product(self):
        response = client.post(
            reverse('product:addProduct'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_product(self):
        response = client.post(
            reverse('product:addProduct'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSingleProductTest(TestCase):
    """ Test module for updating an existing product record """

    def setUp(self):
        category_setup = Category.objects.create(category_id="food_manufacturing",
                                                 category_name="Производство продуктов питания")
        Category.objects.create(category_id="it_companies",
                                category_name="IT-компании")
        self.nescafe = Product.objects.create(
            product_Id=1, product_Name="Nescafe", product_Ticker="Nescf", product_Description="good one",
            product_category=category_setup, product_Price=2.5
        )
        self.cola_cola = Product.objects.create(
            product_Id=2, product_Name="Coca Cola", product_Ticker="CC", product_Description="nice water",
            product_category=category_setup, product_Price=2
        )
        self.valid_payload = {
            'product_Id': 1,
            'product_Name': "Nescafe",
            'product_Ticker': 'Nescf',
            'product_Description': 'A brilliant company with a outstanding future',
            "category_id": "food_manufacturing",
            "category_name": "Производство продуктов питания",
            "product_isSale": False,
            "product_Price": 100
        }
        self.invalid_payload = {
            'product_Id': 1,
            'product_Name': "",
            'product_Ticker': '',
            'product_Description': 'A brilliant company with a outstanding future',
            "category_id": "food_manufacturing",
            "category_name": "Производство продуктов питания",
            "product_isSale": False,
            "product_Price": 100
        }

    def test_valid_update_product(self):
        response = client.put(
            reverse('product:updateProduct', kwargs={'pk': self.nescafe.product_Id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_update_product(self):
        response = client.put(
            reverse('product:updateProduct', kwargs={'pk': self.nescafe.product_Id}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSingleProductTest(TestCase):
    """ Test module for deleting an existing product record """

    def setUp(self):
        category_setup = Category.objects.create(category_id="food_manufacturing",
                                                 category_name="Производство продуктов питания")
        Category.objects.create(category_id="it_companies",
                                category_name="IT-компании")
        self.nescafe = Product.objects.create(
            product_Id=1, product_Name="Nescafe", product_Ticker="Nescf", product_Description="good one",
            product_category=category_setup, product_Price=2.5
        )
        self.cola_cola = Product.objects.create(
            product_Id=2, product_Name="Coca Cola", product_Ticker="CC", product_Description="nice water",
            product_category=category_setup, product_Price=2
        )

    def test_valid_delete_product(self):
        response = client.delete(
            reverse('product:deleteProduct', kwargs={'pk': self.nescafe.product_Id}))
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)

    def test_invalid_delete_product(self):
        response = client.delete(
            reverse('product:deleteProduct', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)