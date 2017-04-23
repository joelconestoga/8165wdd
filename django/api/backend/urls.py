from django.conf.urls import url
from . import views	

app_name = 'backend'

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^users/$', views.users, name='users'),
	url(r'^log_in/$', views.log_in, name='log_in'),
	url(r'^users/(?P<user_id>[0-9]+)/$', views.user_detail, name='user_detail'),
	url(r'^users/(?P<user_id>[0-9]+)/transactions/$', views.user_transactions, name='user_transactions'),
	url(r'^users/(?P<user_id>[0-9]+)/add_transaction/$', views.add_transaction, name='add_transaction'),
	url(r'^users/(?P<user_id>[0-9]+)/categories/(?P<category_id>[0-9]+)/transactions/$', views.user_category_transactions, name='user_category_transactions'),
	url(r'^users/(?P<user_id>[0-9]+)/log_out/$', views.log_out, name='log_out'),
	url(r'^categories/$', views.categories, name='categories'),
	url(r'^categories/(?P<category_id>[0-9]+)/$', views.category_detail, name='category_detail'),
	url(r'^add_category/$', views.add_category, name='add_category'),
]