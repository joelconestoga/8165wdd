from django.conf.urls import url
from . import views	

app_name = 'login'

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^register/$', views.register, name='register'),
	url(r'^log_in/$', views.log_in, name='log_in'),
	url(r'^log_out/$', views.log_out, name='log_out'),	
	url(r'^add_transaction/$', views.add_transaction, name='add_transaction'),
	url(r'^add_category/$', views.add_category, name='add_category'),
]