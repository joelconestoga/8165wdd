import json

from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User

# Create your views here.
def index(request):
	return HttpResponse({'somefield':'somevalue'}, status=200, content_type='application/json')


def users(request):

    if request.method == 'GET':

        users = User.objects.all()

        data = []

        for user in users:
            data.append({
                'id': user.id,
                'username': user.username
            })

        data = json.dumps(data)

        return HttpResponse(data, status=200, content_type='application/json')

    else:

        data = json.loads(request.body)

        user = User.objects.create(username=data.get('username'))

        user = json.dumps({
            'id': user.id,
            'username': user.username
        })

        return HttpResponse(user, status=201, content_type='application/json')

