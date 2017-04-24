import re

from django.conf import settings
from django.urls import reverse
from django.shortcuts import redirect
from django.contrib.auth import logout

class TokenAuthenticationMiddleware:

	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		response = self.get_response(request)
		return response

	def process_view(self, request, view_func, view_args, view_kwargs):
		
		# request is the request coming
		# view_func is the function in views.py going to be called

		print("here")

		#assert hasattr(request, 'user')
		
		# path = request.auth_info.lstrip('/')

		#if path == 'backend/log_out':
#			logout(request)

		#DO TOKEN AUTHENTICATION HERE
		# OR MAYBE CREATE ALSO (HERE)
		# if request.user.is_authenticated() and url_is_exempt:
		# 	return redirect(settings.LOGIN_REDIRECT_URL)
		# elif request.user.is_authenticated() or url_is_exempt:
		# 	return None;
		# else:
		# 	return redirect('backend/login/')