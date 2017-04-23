import json

from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth.models import User

from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.views import View


def index(request, *args, **kwargs):

	count = request.session.get('count', 1)

	count += 1

	request.session['count'] = count

	user = authenticate(username='dszekely', password='qqqqqqqq')

	login(request, user)

	data = {
		'user' : {
			'email' : user.email,
			'username': user.username
		}
	}

	data = json.dumps(data)

	return HttpResponse(content=data, content_type='application/json')

def users(request, **kwargs):

	try:
		user = User.objects.get(id = kwargs.get('user_id', None))

		data = {
			'user': {
				'email': user.email,
				'username': user.username,
				'id': kwargs.get('user_id', 0)
			}
		}


	except User.DoesNotExist:
		user_queryset = User.objects.all()

		data = []

		for user in user_queryset:
			data.append({
				'user' : {
					'email' : user.email,
					'username': user.username
				}
			})

	data = json.dumps(data)

	return HttpResponse(content=data, content_type='application/json')

class UsersView(View):

	def get(self, request):
		return render(request, 'templates/index.html')
