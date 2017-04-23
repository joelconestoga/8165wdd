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
	url(r'^add-transaction/$', views.add_transaction, name='add_transaction'),
	url(r'^add-category/$', views.add_category, name='add_category'),
]