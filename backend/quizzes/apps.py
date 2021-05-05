from django.apps import AppConfig


class QuizzesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'quizzes'
    verbose_name = "Набор тестов"

    def ready(self):
        import quizzes.signals
