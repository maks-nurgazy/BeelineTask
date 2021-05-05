from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.utils.translation import gettext as _

from users.models import User


class MyUserAdmin(UserAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email')
    fieldsets = (
        (None, {'fields': ('username', 'email',)}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        (_('Permissions'),
         {'fields': ('is_active', 'is_staff', 'is_superuser')}
         )
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2')}
         ),
    )
    search_fields = ('username',)


ordering = ('username',)
filter_horizontal = ()

admin.site.register(User, MyUserAdmin)
admin.site.unregister(Group)
