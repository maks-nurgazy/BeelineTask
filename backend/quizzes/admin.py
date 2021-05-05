from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError
from django.forms.models import BaseInlineFormSet

from quizzes.models import Option, Question, TestKit


class OptionInlineFormset(BaseInlineFormSet):

    def clean(self):
        answer = ""
        count = 0
        my_set = set()
        for form in self.forms:
            try:
                data = form.cleaned_data
                answer = data['question'].answer
                choice = data['choice']
                choice_text = data['choice_text']
                if answer == choice:
                    count += 1
                if choice_text in my_set:
                    raise forms.ValidationError("Повторяющийся ответ - " + choice_text)
                else:
                    my_set.add(choice_text)
            except AttributeError:
                pass
            except KeyError:
                raise forms.ValidationError("Fields must be filled")
        if count < 1:
            raise forms.ValidationError("Должен быть хотя бы 1 правильный вариант - " + answer)
        elif count == len(self.forms):
            raise forms.ValidationError("Все варианты не могут быть правильными - " + answer)


class OptionInline(admin.TabularInline):
    formset = OptionInlineFormset
    model = Option
    extra = 0
    min_num = 2


class QuestionForm(forms.ModelForm):
    class Meta:
        fields = ('test_kit', 'text', 'answer')
        model = Question

    def clean(self):
        data = self.cleaned_data
        return data


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    form = QuestionForm
    list_display = ('id', 'text', 'test_kit', 'answer', 'get_choice_text')
    list_filter = ('test_kit',)
    inlines = [
        OptionInline
    ]

    def get_choice_text(self, obj):
        options = obj.options.all()
        for option in options:
            if option.choice == obj.answer:
                return option.choice_text
        return obj.answer

    get_choice_text.short_description = "Answer description"


@admin.register(TestKit)
class TestKitAdmin(admin.ModelAdmin):
    pass
