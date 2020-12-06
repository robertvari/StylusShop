from django.contrib import admin
from django.urls import path, include
from allauth.account.views import confirm_email
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/auth/', include('rest_auth.urls')),
    path('api/auth/registration/account-confirm-email/', confirm_email, name="account_email_verification_sent"),
    path('api/auth/registration/account-confirm-email/<key>/', confirm_email),
    path('api/auth/registration/', include('rest_auth.registration.urls')),

    path('api/v01/shop/', include('shop.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)