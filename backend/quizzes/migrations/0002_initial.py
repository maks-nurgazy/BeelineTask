# Generated by Django 3.2 on 2021-05-01 18:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('quizzes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='question',
            name='test_kit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quizzes.testkit'),
        ),
        migrations.AddField(
            model_name='option',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='options', to='quizzes.question'),
        ),
        migrations.AlterUniqueTogether(
            name='quiz',
            unique_together={('user', 'test_kit')},
        ),
    ]
