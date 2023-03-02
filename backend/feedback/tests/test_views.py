import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from ..serializer import GetReviewSerilizer
from ..models import Review
from product.models import Product
from users.models import User
from product.models import Category


# initialize the APIClient app
client = Client()


class GetAllReviewsTest(TestCase):
    """ Test module for GET all reviews API """

    def setUp(self):
        category_setup = Category.objects.create(category_id="food_manufacturing",
                                                 category_name="Производство продуктов питания")
        nescafe_setup = Product.objects.create(
            product_Id=20, product_Name="Nescafe", product_Ticker="Nescf", product_Description="good one",
            product_category=category_setup, product_Price=2.5
        )
        andy_setup = User.objects.create(first_Name="Andy", last_Name="Garfied", email="andy11@gmail.com")
        Review.objects.create(
            rating=4, content="cool one", productReviewed=nescafe_setup, customer=andy_setup)

    def test_get_all_reviews(self):
        # get API response
        response = client.get(reverse('feedback:getAllReview'))
        # get data from db
        reviews = Review.objects.all()
        serializer = GetReviewSerilizer(reviews, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class DeleteSingleReviewTest(TestCase):
    """ Test module for deleting an existing Review record """

    def setUp(self):
        category_setup = Category.objects.create(category_id="food_manufacturing",
                                                 category_name="Производство продуктов питания")
        nescafe_setup = Product.objects.create(
            product_Id=20, product_Name="Nescafe", product_Ticker="Nescf", product_Description="good one",
            product_category=category_setup, product_Price=2.5
        )
        andy_setup = User.objects.create(first_Name="Andy", last_Name="Garfied", email="andy11@gmail.com")
        self.andies_review_setup = Review.objects.create(
            rating=4, content="cool one", productReviewed=nescafe_setup, customer=andy_setup)

    def test_valid_delete_review(self):
        response = client.delete(
            reverse('feedback:deleteReview', kwargs={'pk': self.andies_review_setup.pk}))
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)

    def test_invalid_delete_review(self):
        response = client.delete(
            reverse('feedback:deleteReview', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)