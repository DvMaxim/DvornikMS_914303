from django.contrib import admin
from product.models import Product ,Category,Cart,Product_In_Cart

# Register your models here.
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(Product_In_Cart)