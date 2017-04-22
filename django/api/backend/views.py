import json
import datetime
from datetime import timedelta
from time import strftime
import pytz
from django.utils import timezone

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseForbidden
from django.contrib.auth.models import User
from .models import Transaction, UserSession
from decimal import Decimal
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate

CONST_SECONDS_TO_EXPIRE = 300

# Create your views here.
def index(request):
    return createResponse([])


@csrf_exempt
def log_in(request):

    if request.method == 'POST':

        username = request.POST['username']
        password = request.POST['password']
       
        user = authenticate(username=username, password=password)

        if user is None:
            return HttpResponseForbidden()

        log("user.is_staff", user.is_staff)

        token = createSession(user)
        
        return createResponse([], {'token':{'value':token}})

    else:
        if is_authenticated(request):
            return createResponse([])
        else:
            return HttpResponseForbidden()


def createSession(user):
    deleteExistingSession(user)
    session = createNewSession(user)
    return createToken(user, session)


def deleteExistingSession(user):
    for session in UserSession.objects.filter(user=user):
        session.delete()


def createNewSession(user):
    session = UserSession.objects.create(
        user=user, 
        expiration=timezone.now()+timedelta(seconds=CONST_SECONDS_TO_EXPIRE))
    session.save()
    return session
    

def createToken(user, session):
    return str(user.id) + ',' + session.expiration.strftime("%Y,%m,%d,%H,%M,%S")


def createResponse(elements, token = {}):
    response = token
    response['elements'] = elements
    response = json.dumps(response, default=default)

    return HttpResponse(response, status=200, content_type='application/json')


@csrf_exempt
def is_authenticated(request, staff_required=False):

    try:
        user_id = get_header_id(request)

        if staff_required and not is_staff(user_id):
            return False

        session = UserSession.objects.get(user_id=user_id)
        
        return session.expiration > timezone.now()
    
    except Exception as e:
        log("Exception in is_authenticated", str(e))
        return False


def get_header_id(request):
    try:
        token = request.META['HTTP_AUTHORIZATION']
        return 0 if token == "null" else token.split(',')[0]
    except Exception as e:
        log("Exception in get_header_id", str(e))
        return 0


def is_staff(id):
    try:
       user = User.objects.get(id=id)
       return user.is_staff
    except Exception as e:
        log("Exception in is_staff", str(e))
        return False


@csrf_exempt
def log_out(request, id):
    session = UserSession.objects.get(user_id=id)
    session.delete()
    return createResponse([])


def user_transactions(request, id):
    if not is_authenticated(request):
        return HttpResponseForbidden()

    transactions = Transaction.objects.filter(user_id=id)

    elements = []

    for trans in transactions:
        elements.append({
            'id': trans.id,
            'name': trans.name,
            'value': trans.value
        })

    return createResponse(elements)


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

        if not is_authenticated(request, True):
            return HttpResponseForbidden()

        users = User.objects.all()

        elements = []

        for user in users:
            elements.append({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_staff': user.is_staff,
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


def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError


def log(label, info=""):
    print(" - SERVER - - - - - - - - - - - - > " + label + ": " + str(info))






