from django.urls import path

from quizzes.api.views import TestKitListAPIView, AnswerAPIView, TestKitAPIView

urlpatterns = [
    path('test-kits/', TestKitListAPIView.as_view()),
    path('<str:test_kit_url>/questions/', TestKitAPIView.as_view()),
    path('<str:test_kit_url>/answers/', AnswerAPIView.as_view())
]
