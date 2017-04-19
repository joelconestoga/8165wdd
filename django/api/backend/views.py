import json
import datetime
import pytz

from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import Transaction, UserSession
from decimal import Decimal

# Create your views here.
def index(request):
    return HttpResponse({}, status=200, content_type='application/json')

def user_transactions(request, id):
    if not is_authenticated(request):
        return HttpResponse({'error':'Invalid Login.'}, status=403, content_type='application/json')

    transactions = Transaction.objects.filter(user_id=id)

    elements = []

    for trans in transactions:
        elements.append({
            'id': trans.id,
            'name': trans.name,
            'value': trans.value
        })

    return createResponse(elements)


def is_authenticated(request):

    token = request.META['HTTP_AUTHORIZATION']

    data = token.split(',')
    expiresAt = datetime.datetime(int(data[1]), int(data[2]), int(data[3]), 
        int(data[4]), int(data[5]), int(data[6]), tzinfo=pytz.UTC)

    sessions = UserSession.objects.filter(user_id=data[0])

    if len(sessions) < 1:
        return False

    session = sessions[0]

    print("============ TOKEN expires at:" + str(expiresAt) + 
        " / session.epiration:" + str(session.epiration))

    return expiresAt < session.epiration


def login_in(request):

    username = request.POST['username']
    password = request.POST['password']

    user = authenticate(username=username, password=password)

    '''
    if user is None:
        return render(request, 'manager/log_in.html', {'error_message': 'Invalid login/password.'})
    '''

    my_login(request, user)
    
    return index(request)


def user_detail(request, id):
    if request.method == 'GET':

        users = User.objects.filter(id=id)

        elements = []

        for user in users:
            elements.append({
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
            })

        return createResponse(elements)


def users(request):

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
    response = json.dumps(response, default=default)

    return HttpResponse(response, status=200, content_type='application/json')


def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError

