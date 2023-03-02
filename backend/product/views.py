from django.shortcuts import render
from product.models import Product, Category
from rest_framework.response import Response
from rest_framework.views import APIView
from product.serializer import ProductSerializer, ProductAddingSerializer
from rest_framework import status
from users.errorrRenderers import UserRenderer


# Create your views here.

class ProductView(APIView):
    renderer_classes = [UserRenderer]
    model = Product
    def post(self, request, format=None):
        # imageSerilizer = ImageGallerySerializer(data=request.data)
        # imageSerilizer.is_valid(raise_exception=ValueError)
        # images = imageSerilizer.save()

        category = Category.objects.get(category_name=request.data.get('category_name'))

        serializer = ProductAddingSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            product = Product.objects.create(**serializer.data, product_category=category)
            serilzer = ProductSerializer(product)
            return Response(serilzer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        product = Product.objects.all()
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
        try:
            ProductRes = Product.objects.get(product_Id=pk)
            ProductRes.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except self.model.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DetailedProductView(APIView):
    def get(self, request, pk, format=None):
        product = Product.objects.get(product_Id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateProductView(APIView):

    def put(self, request, pk, format=None):

        print(list(request.data.items()))

        category = Category.objects.get(category_name=request.data.get('category_name'))
        snippet1 = Product.objects.get(product_Id=pk)

        serializer = ProductAddingSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            if request.data.get('image') != '':
                snippet1.image = request.data.get('image')
            else:
                request.data.remove('image')
            snippet1.product_Name = request.data.get('product_Name')
            snippet1.product_Description = request.data.get('product_Description')
            snippet1.product_Price = request.data.get('product_Price')

            snippet1.product_isSale = request.data.get('product_isSale')
            snippet1.product_category = category
            snippet1.save()
            serilzer = ProductSerializer(snippet1)
            return Response(serilzer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
