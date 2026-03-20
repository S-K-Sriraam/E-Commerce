from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.views.generic import View

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
from django.utils import timezone

from .models import Product, Order, OrderItem, ShippingAddress
from .serializer import (
    ProductSerializer,
    UserSerializer,
    UserSerializerWithToken,
    OrderSerializer,
)
from .utils import generate_token


# -------------------------
# BASIC ROUTES
# -------------------------

@api_view(['GET'])
@permission_classes([AllowAny])
def getRoutes(request):
    return Response({
        "products": "/api/products/",
        "product": "/api/products/1/",
        "login": "/api/users/login/",
        "register": "/api/users/register/",
        "users": "/api/users/getallusers/",
    })


# -------------------------
# PRODUCT APIs (PUBLIC)
# -------------------------

@api_view(['GET'])
@permission_classes([AllowAny])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def getProduct(request, pk):
    product = get_object_or_404(Product, _id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# -------------------------
# JWT LOGIN
# -------------------------

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user, many=False)
        data.update(serializer.data)
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# -------------------------
# USER REGISTRATION (PUBLIC)
# -------------------------

@api_view(['POST'])
@permission_classes([AllowAny])
def registerUser(request):
    data = request.data

    if User.objects.filter(email=data['email']).exists():
        return Response(
            {'detail': 'User already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=data['email'],
        email=data['email'],
        password=data['password'],
        first_name=data.get('fname', ''),
        last_name=data.get('lname', ''),
        is_active=True   # ✅ REQUIRED FOR JWT
    )

    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


# -------------------------
# ORDER APIs (AUTH REQUIRED)
# -------------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    order_items = data.get('orderItems', [])
    if not order_items:
        return Response({'detail': 'No order items'}, status=400)

    order = Order.objects.create(
        user=user,
        paymentMethod=data.get('paymentMethod', 'Cash on Delivery'),
        taxPrice=data['taxPrice'],
        shippingPrice=data['shippingPrice'],
        totalPrice=data['totalPrice'],
        createdAt=timezone.now()
    )

    ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        postalCode=data['shippingAddress']['postalCode'],
        country=data['shippingAddress']['country'],
    )

    for item in order_items:
        product = Product.objects.get(_id=item['product'])
        OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            qty=item['qty'],
            price=item['price'],
            image=product.image.url,
        )

        product.countInStock -= item['qty']
        product.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    orders = request.user.order_set.all()
    for order in orders:
        if not order.createdAt:
            order.createdAt = timezone.now()
            order.save(update_fields=['createdAt'])
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    order = get_object_or_404(Order, _id=pk)
    user = request.user

    if user.is_staff or order.user == user:
        if not order.createdAt:
            order.createdAt = timezone.now()
            order.save(update_fields=['createdAt'])
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

    return Response({'detail': 'Not authorized'}, status=403)


# -------------------------
# ADMIN PRODUCT APIs
# -------------------------

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    product = Product.objects.create(
        user=request.user,
        name='Sample Product',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    product = get_object_or_404(Product, _id=pk)
    data = request.data

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = get_object_or_404(Product, _id=pk)
    product.delete()
    return Response({'detail': 'Product deleted'})


@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadImage(request):
    product = Product.objects.get(_id=request.data['product_id'])
    product.image = request.FILES.get('image')
    product.save()
    return Response({'detail': 'Image uploaded'})


# -------------------------
# ADMIN USER APIs
# -------------------------

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserById(request, pk):
    user = get_object_or_404(User, id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.first_name = data['fname']
    user.last_name = data['lname']
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    user = get_object_or_404(User, id=pk)
    user.delete()
    return Response({'detail': 'User deleted'}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    user = get_object_or_404(User, id=pk)
    data = request.data

    user.first_name = data.get('name', user.first_name)
    user.email = data.get('email', user.email)
    user.is_staff = data.get('isAdmin', user.is_staff)

    user.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# -------------------------
# EMAIL ACTIVATION (OPTIONAL)
# -------------------------

class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except Exception:
            user = None

        if user and generate_token.check_token(user, token):
            user.is_active = True
            user.save()
            return render(request, "activatesuccess.html")

        return render(request, "activatefail.html")
