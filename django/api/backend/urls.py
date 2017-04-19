from django.conf.urls import url
from . import views	

app_name = 'backend'

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^users/$', views.users, name='users'),
	url(r'^users/(?P<id>[0-9]+)/$', views.user_detail, name='user_detail'),
	url(r'^users/(?P<id>[0-9]+)/transactions/$', views.user_transactions, name='user_transactions'),
	url(r'^users/(?P<id>[0-9]+)/log_out/$', views.log_out, name='log_out'),
]