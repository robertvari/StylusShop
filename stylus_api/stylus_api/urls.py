from django.contrib import admin
from django.urls import path, include, re_path
from allauth.account.views import confirm_email
from django.conf import settings
from django.conf.urls.static import static

from react.views import ReactView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v01/auth/', include('rest_auth.urls')),
    path('api/v01/auth/registration/account-confirm-email/', confirm_email, name="account_email_verification_sent"),
    path('api/v01/auth/registration/account-confirm-email/<key>/', confirm_email),
    path('api/v01/auth/registration/', include('rest_auth.registration.urls')),

    path('api/v01/shop/', include('shop.urls')),
    path('api/v01/users/', include('users.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path('', ReactView.as_view())
]