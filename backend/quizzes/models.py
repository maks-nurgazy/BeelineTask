from django.db import models

from users.models import User


class TestKit(models.Model):
    name = models.CharField(max_length=50, help_text="Имя для тестового набора")
    name_url = models.CharField(max_length=10, unique=True, help_text="Для URL запроса")

    def __str__(self):
        return self.name


class Question(models.Model):
    test_kit = models.ForeignKey(TestKit, on_delete=models.CASCADE)
    text = models.CharField(max_length=256, unique=True)
    answer = models.CharField(max_length=100, help_text="То что здесь написано должен быть в CHOICE  в меню OPTION")
    count = models.PositiveBigIntegerField()
    created = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        count = self.test_kit.question_set.count() + 1
        self.count = count
        super(Question, self).save(*args, **kwargs)

    def __str__(self):
        return self.text


class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="options")
    choice = models.CharField(max_length=10, help_text="Вариант например: а")
    choice_text = models.CharField(max_length=256, help_text="Ответ для варианта")

    def __str__(self):
        return self.choice_text


class Quiz(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test_kit = models.ForeignKey(TestKit, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} quizzes'


class UserAnswer(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    is_correct = models.BooleanField(default=False)
    answer = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.quiz.user} answers'
