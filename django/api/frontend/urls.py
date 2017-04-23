from django.conf.urls import url
from . import views	

app_name = 'frontend'

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^login/$', views.login, name='login'),
	url(r'^register/$', views.register, name='register'),
	url(r'^users/$', views.users, name='users'),
	url(r'^transactions/$', views.transactions, name='transactions'),
]