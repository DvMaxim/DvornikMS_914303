from asyncio.windows_events import NULL
from operator import truediv
from xml.etree.ElementInclude import default_loader
from django.db import models
from django.conf import settings

# Create your models here.


class Category(models.Model):
    category_id = models.CharField(max_length=50)
    category_name = models.CharField(max_length=50)

    def __str__(self):
        return self.category_name
    

class Product(models.Model):
    product_Id=models.AutoField(primary_key=True)
    product_Name=models.CharField(max_length=50)
    product_Ticker = models.CharField(max_length=50)
    product_Description=models.TextField(max_length=700)
    product_category=models.ForeignKey(Category , on_delete=models.SET_DEFAULT,default='')
    product_Price=models.FloatField()
    product_isSale=models.BooleanField(default=False)
    added_at =models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    image=models.ImageField(upload_to='product', default="/product/default.png")

    def __str__(self):
        return f"{self.product_Name}"


class Cart(models.Model):
    cart_Id=models.AutoField(primary_key=True)
    customer_Id = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    total_Amount=models.FloatField()
    

class Product_In_Cart(models.Model):
    class meta:
        unique_together=(('product_Id' , 'cart_Id'),)
    product_Id = models.ForeignKey(Product , on_delete=models.CASCADE)
    cart_Id = models.ForeignKey(Cart , on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField()

    
