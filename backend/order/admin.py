from django.contrib import admin
from order.models import Order , Ordered_Product, Payment
# Register your models here.
admin.site.register(Order)
admin.site.register(Ordered_Product)
admin.site.register(Payment)

