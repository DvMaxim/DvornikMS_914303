from django.test import TestCase

# Create your tests here.

import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from users.models import User
from users.serializer import AllCusromersSerializer


# initialize the APIClient app
client = Client()


class GetAllCustomersTest(TestCase):
    """ Test module for GET all Customers API """

    def setUp(self):
        andy_setup = User.objects.create(first_Name="Andy", last_Name="Garfied",
                                         email="andy11@gmail.com", type='CUSTOMER')
        deny_setup = User.objects.create(first_Name="Deny", last_Name="Vorobey",
                                         email="deny22@gmail.com", type='CUSTOMER')

    def test_get_all_customers(self):
        # get API response
        response = client.get(reverse('users:allCustomers'))
        # get data from db
        customers = User.objects.filter(type='CUSTOMER')
        serializer = AllCusromersSerializer(customers, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetAllStaffTest(TestCase):
    """ Test module for GET all staff API """

    def setUp(self):
        maks_setup = User.objects.create(first_Name="Maks", last_Name="Dvornik",
                                         email="maks33@gmail.com", type='Staff')

    def test_get_all_staff(self):
        # get API response
        response = client.get(reverse('users:allStaff'))
        # get data from db
        customers = User.objects.filter(type='Staff')
        serializer = AllCusromersSerializer(customers, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class CreateNewUserTest(TestCase):
    """ Test module for inserting a new user """

    def setUp(self):
        self.valid_payload = {
            'first_Name': "Maks",
            'last_Name': "Dvornik",
            'email': 'maks33@gmail.com',
            "phone_Number": "+375293343889",
            "password": "12345",
            'type': 'CUSTOMER'
        }
        self.invalid_payload = {
            'first_Name': "",
            'last_Name': "",
            'email': 'maks33@gmail.com',
            "phone_Number": "+375293343889",
            "password": "12345",
            'type': 'CUSTOMER'
        }

    def test_create_valid_user(self):
        response = client.post(
            reverse('users:Registration'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_user(self):
        response = client.post(
            reverse('users:Registration'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSingleProductTest(TestCase):
    """ Test module for updating an existing user record """

    def setUp(self):
        self.andy_setup = User.objects.create(first_Name="Andy", last_Name="Garfied",
                                         email="andy11@gmail.com", type='CUSTOMER')
        self.deny_setup = User.objects.create(first_Name="Deny", last_Name="Vorobey",
                                         email="deny22@gmail.com", type='CUSTOMER')
        self.valid_payload = {
            'first_Name': "Andy",
            'last_Name': "Garfied",
            "phone_Number": "+375293343889",
            "password": "12345",
            'email': 'andygarf55@gmail.com',
            'type': 'CUSTOMER'
        }
        self.invalid_payload = {
            'first_Name': "",
            'last_Name': "",
            "phone_Number": "+375293343889",
            "password": "12345",
            'email': 'maks33@gmail.com',
            'type': 'CUSTOMER'
        }

    def test_valid_update_user(self):
        response = client.put(
            reverse('users:updateUser', kwargs={'pk': self.andy_setup.pk}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_update_user(self):
        response = client.put(
            reverse('users:updateUser', kwargs={'pk': self.andy_setup.pk}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSingleUserTest(TestCase):
    """ Test module for deleting an existing user record """

    def setUp(self):
        self.andy_setup = User.objects.create(first_Name="Andy", last_Name="Garfied",
                                              email="andy11@gmail.com", type='CUSTOMER')
        self.deny_setup = User.objects.create(first_Name="Deny", last_Name="Vorobey",
                                              email="deny22@gmail.com", type='CUSTOMER')

    def test_valid_delete_user(self):
        response = client.delete(
            reverse('users:deleteUser', kwargs={'pk': self.andy_setup.pk}))
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)

    def test_invalid_delete_user(self):
        response = client.delete(
            reverse('users:deleteUser', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)