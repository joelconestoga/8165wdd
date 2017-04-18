import json

from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User

# Create your views here.
def index(request):
	return HttpResponse({'somefield':'somevalue'}, status=200, content_type='application/json')


def user_detail(request, id):
    if request.method == 'GET':

        users = User.objects.filter(id=id)

        elements = []

        for user in users:
            elements.append({
                'id': user.id,
                'username': user.username
            })

        return createResponse(elements)


def users(request):

    print("TOKEN ---- >" + request.META['HTTP_AUTHORIZATION'])

    if request.method == 'GET':

        users = User.objects.all()

        elements = []

        for user in users:
            elements.append({
                'id': user.id,
                'username': user.username
            })

        return createResponse(elements)

    else:

        data = json.loads(request.body)

        user = User.objects.create(username=data.get('username'))

        user = json.dumps({
            'id': user.id,
            'username': user.username
        })

        return HttpResponse(user, status=201, content_type='application/json')


def createResponse(elements):

    response = {'token':{'value':'server token'}}
    response['elements'] = elements
    response = json.dumps(response)

    return HttpResponse(response, status=200, content_type='application/json')
