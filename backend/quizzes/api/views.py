from django.core.exceptions import ObjectDoesNotExist
from rest_framework.generics import ListAPIView, GenericAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from quizzes.api.serializers import TestKitListSerializer, QuestionListSerializer, AnswerSerializer, TestKitSerializer
from quizzes.models import TestKit, Question, Quiz, UserAnswer


class TestKitListAPIView(ListAPIView):
    queryset = TestKit.objects.all()
    serializer_class = TestKitListSerializer
    permission_classes = [IsAuthenticated, ]


class QuestionListAPIView(ListAPIView):
    serializer_class = QuestionListSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        try:
            test_kit_url = self.kwargs['test_kit_url']
            test_kit = TestKit.objects.get(name_url=test_kit_url)
            queryset = Question.objects.filter(test_kit=test_kit).order_by('count')
            return queryset
        except:
            return []


class TestKitAPIView(RetrieveAPIView):
    serializer_class = TestKitSerializer
    permission_classes = [IsAuthenticated, ]

    def get_object(self):
        try:
            test_kit_url = self.kwargs['test_kit_url']
            test_kit = TestKit.objects.get(name_url=test_kit_url)
            return test_kit
        except:
            return []


class AnswerAPIView(GenericAPIView):
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def post(self, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data, many=True, context=self.get_serializer_context())
        valid = serializer.is_valid()
        if not valid:
            return Response(serializer.errors)
        user_answer = serializer.save()
        count = 0
        total = len(user_answer)
        for answer in user_answer:
            if answer.is_correct:
                count += 1
        result_data = {
            "correct": count,
            "incorrect": total - count,
            "percentage": round(count * 100 / total)
        }
        return Response(result_data)

    def get_serializer_context(self):
        context = super(AnswerAPIView, self).get_serializer_context()
        kit = self.kwargs['test_kit_url']
        try:
            test_kit = TestKit.objects.get(name_url=kit)
            context['test_kit'] = test_kit
            context['user'] = self.request.user
        except ObjectDoesNotExist:
            pass
        return context
