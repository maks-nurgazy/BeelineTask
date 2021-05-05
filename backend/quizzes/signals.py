from django.db.models.signals import post_save
from django.dispatch import receiver


# @receiver(post_save, sender=UserAnswer)
# def create_user_answer(sender, instance, created, **kwargs):
#     if created:
#         answered = instance.user_answer
#         question = instance.question
#         correct_answer = question.answer
#         if answered == correct_answer:
#             instance.is_correct = True
#             instance.save()
