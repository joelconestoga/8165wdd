from django.conf.urls import url
from . import views	

app_name = 'frontend'

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^login/$', views.login, name='login'),
	url(r'^register/$', views.register, name='register'),
	url(r'^users/$', views.users, name='users'),
	url(r'^transactions/$', views.transactions, name='transactions'),
	url(r'^categories/$', views.categories, name='categories'),
	url(r'^categories/(?P<id>[0-9]+)/$', views.category_detail, name='category_details'),
	url(r'^add-transaction/$', views.add_transaction, name='add_transaction'),
]