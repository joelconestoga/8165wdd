from django.conf.urls import url

from .views import index, users, UsersView

urlpatterns = [
    url('^$', index),
    url('^users/$', users),
    url('^users/(?P<user_id>\d)*$', users),
    url('^test/$', UsersView.as_view())
]
