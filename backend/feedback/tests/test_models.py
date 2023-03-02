from django.test import TestCase
from ..models import Review
from product.models import Product
from users.models import User
from product.models import Category


class ReviewTest(TestCase):
    """ Test module for Review model """

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


    def test_review_model_perfomance(self):
        nescafe = Product.objects.get(product_Name="Nescafe")
        andy = User.objects.get(first_Name="Andy", last_Name="Garfied")
        review_oracle_test = Review.objects.get(rating=4, content="cool one", productReviewed=nescafe, customer=andy)

        self.assertEqual(
            review_oracle_test.__str__(), f"Customer andy11@gmail.com give product Nescafe rating 4 stars.")