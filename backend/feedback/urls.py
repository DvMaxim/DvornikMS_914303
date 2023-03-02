from django.urls import path
from .views import *

app_name = 'feedback'

urlpatterns = [
    path('getAllReview/', ReviewView.as_view(), name='getAllReview'),
    path('getAllQuestion/', QusetionView.as_view(), name='getAllQusetion'),
    path('postReview/', ReviewView.as_view(), name='postReview'),
    path('postQusetion/', QusetionView.as_view(), name='postQusetion'),
    path('deleteQusetion/', QusetionView.as_view(), name='deleteQusetion'),
    path('deleteReview/<int:pk>', ReviewView.as_view(), name='deleteReview'),
]
