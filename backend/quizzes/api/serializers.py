from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from quizzes.models import TestKit, Question, Option, Quiz, UserAnswer


class TestKitListSerializer(ModelSerializer):
    total_questions = serializers.SerializerMethodField()

    class Meta:
        model = TestKit
        fields = ('id', 'name', 'name_url', 'total_questions')

    def get_total_questions(self, obj):
        return obj.question_set.count()


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = ('choice', 'choice_text')


class QuestionListSerializer(ModelSerializer):
    options = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ('id', 'text', 'answer', 'options', 'count')

    def get_options(self, obj):
        return OptionSerializer(obj.options, many=True).data


class TestKitSerializer(ModelSerializer):
    questions = serializers.SerializerMethodField()

    class Meta:
        model = TestKit
        fields = ('id', 'name', 'name_url', 'questions')

    def get_questions(self, obj):
        return QuestionListSerializer(obj.question_set.all(), many=True).data


class AnswerSerializer(serializers.Serializer):
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    choice = serializers.CharField(help_text='Вариант например: а', max_length=10)
    choice_text = serializers.CharField(help_text='Ответ для варианта', max_length=256)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        test_kit = self.context['test_kit']
        user = self.context['user']
        quiz = Quiz.objects.create(user=user, test_kit=test_kit)
        question = validated_data['question']
        data = {
            'quiz': quiz,
            'question': question,
            'is_correct': question.answer == validated_data['choice'],
            'answer': validated_data['choice_text']
        }
        return UserAnswer.objects.create(**data)
