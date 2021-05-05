from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('quizzes.api.urls')),
    path('api/auth/', include('users.api.urls')),
    path('api-auth/', include('rest_framework.urls'))
]
