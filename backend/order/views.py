from rest_framework.response import Response
from rest_framework.views import APIView
from order.models import Order, Ordered_Product
from order.serializer import *
from rest_framework import status
from product.models import Product
from users.errorrRenderers import UserRenderer
from order.make_predictions import process_order
from django.utils import timezone

from backend.settings import EMAIL_HOST_USER


class OrderView(APIView):
    model = Order
    def get(self, request, format=None):
        order = Order.objects.all()
        serializer = AllOrderSerializer(order, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        orderRes = Order.objects.get(order_Id=pk)

        Orderstatus = request.data.pop("order_Status")
        if Orderstatus == "Delivered":
            payment = orderRes.payment
            payment.amount_Paid = orderRes.total_Amount
            payment.payment_Status = "Paid"
            payment.save()

        serializer = OrderUpdateSerializer(orderRes, data=request.data)
        # validate and update
        if serializer.is_valid(raise_exception=ValueError):
            orderRes.order_Status = Orderstatus
            orderRes.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            orderRes = Order.objects.get(order_Id=pk)
            orderRes.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except self.model.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)



class DetaildOrderView(APIView):
    def get(self, request, pk, format=None):
        order = Order.objects.get(order_Id=pk)

        serializer = DetailedOrderSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderedProductsView(APIView):
    def get(self, request, pk):
        products = Ordered_Product.objects.filter(order_Id=pk)
        serializer = OrderedProductsSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PlaceOrderView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):

        # addressData = request.data.pop('address')
        # addressSerializer = AddressSerializer(data=addressData)
        # if addressSerializer.is_valid(raise_exception=ValueError):
        #    address = addressSerializer.save()
        # else:
        #    return Response(addressSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        paymentData = request.data.pop('payment')
        paymentSerializer = PaymentSerializer(data=paymentData)
        if paymentSerializer.is_valid(raise_exception=ValueError):
            payment = paymentSerializer.save()
        else:
            return Response(paymentSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(pk=request.data.get('customer'))
        # serilizeUser = PhoneNumberSerializer(data=request.data)
        # if serilizeUser.is_valid(raise_exception=True):
        #     user.phone_Number = request.data.get("phone_Number")
        #     # user.address = address
        #     user.save()
        # else:
        #     return Response(serilizeUser.errors, status=status.HTTP_400_BAD_REQUEST)

        orderSerializer = OrderPostSerializer(data=request.data)

        if orderSerializer.is_valid(raise_exception=ValueError):
            order = Order.objects.create(
                **orderSerializer.data, customer=user, payment=payment)
        else:
            return Response(orderSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        ProductsArray = request.data.pop('products')

        for product in ProductsArray:
            productInstance = Product.objects.get(pk=product.get('id'))
            qyantity = product.get('quantity')
            Ordered_Product.objects.create(
                product_Id=productInstance, order_Id=order, quantity=qyantity)
        order_items = Ordered_Product.objects.filter(order_Id=order.order_Id)
        process_order(order_items, EMAIL_HOST_USER, request.data.get("destination_email"), user.first_Name,
                      user.last_Name, order.order_Placment_Date, order.order_Placment_Time)
        order.order_Status = 'Delivered'
        # order.order_Delivery_Date = str(timezone.now)
        order.save()
        completeOrder = DetailedOrderSerializer(order)
        return Response(completeOrder.data, status=status.HTTP_201_CREATED)


class UpdatePaymentView(APIView):
    renderer_classes = [UserRenderer]

    def put(self, request, pk, format=None):
        payment = Payment.objects.get(pk=pk)
        paymentSerilizer = UpdatePaymentSerializer(data=request.data)
        if paymentSerilizer.is_valid(raise_exception=True):
            payment.amount_Piad = request.data.get("amount_Piad")
            payment.payment_Status = request.data.get("payment_Status")
            payment.save()
            return Response(paymentSerilizer.data, status=status.HTTP_200_OK)
        else:
            return Response(paymentSerilizer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserOrdersView(APIView):
    def get(self, request, pk, format=None):
        order = Order.objects.filter(customer=pk)
        serializer = AllOrderSerializer(order, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
