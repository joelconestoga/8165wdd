from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
	return render(request, 'frontend/index.html')


def login(request):
	return render(request, 'frontend/login.html')


def register(request):
	return render(request, 'frontend/register.html')


def users(request):
	return render(request, 'frontend/users.html')


def transactions(request):
	return render(request, 'frontend/transactions.html')


def add_transaction(request):
	return render(request, 'frontend/add-transaction.html')


def categories(request):
	return render(request, 'frontend/categories.html')

