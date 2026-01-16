from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),

    path('products/', views.getProducts),
    path('products/<int:pk>/', views.getProduct),

    path('users/login/', views.MyTokenObtainPairView.as_view()),
    path('users/register/', views.registerUser),
    path('users/getallusers/', views.getUsers),
    path('users/<int:pk>/', views.getUserById),
    path('users/update/<int:pk>/', views.updateUser),
    path('users/delete/<int:pk>/', views.deleteUser),

    path('orders/', views.getOrders),                # ADMIN – ORDER LIST
    path('orders/add/', views.addOrderItems),        # CREATE ORDER
    path('orders/myorders/', views.getMyOrders),     # USER ORDERS
    path('orders/<str:pk>/', views.getOrderById),    # ORDER DETAILS

    path('users/profile/', views.getUserProfile, name="getUserProfile"),
    path('users/profile/update/', views.updateUserProfile, name="updateUserProfile")
]