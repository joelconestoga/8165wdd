from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .forms import UserForm, TransactionForm, CategoryForm
from .models import Transaction, Category

def index(request) :
	if not request.user.is_authenticated():
		return render(request, 'login/log_in.html')

	transactions = Transaction.objects.filter(user=request.user)
	return render(request, 'login/index.html', {'transactions': transactions})

def log_in(request):
	
	if request.method != "POST":
		return render(request, 'login/log_in.html')
		
	username = request.POST['username']
	password = request.POST['password']

	user = authenticate(username=username, password=password)

	if user is None:
		return render(request, 'login/log_in.html', {'error_message': 'Invalid login'})

	login(request, user)
	
	return index(request)


def log_out(request):
    logout(request)
    form = UserForm(request.POST or None)
    return render(request, 'login/log_in.html')


def register(request):
	form = UserForm(request.POST or None)

	if form.is_valid():

		user = form.save(commit=False)

		#cleaned (normalized) data
		username = form.cleaned_data['username']
		password = form.cleaned_data['password']
		user.set_password(password)
		user.save()

		# returns User objects if credentials are correct
		user = authenticate(username=username, password=password)

		if user is not None:
			if user.is_active:
				login(request, user)
				return index(request)

	return render(request, 'login/register.html', {'form': form})


def add_transaction(request):
	
	if not request.user.is_authenticated():
		return render(request, 'login/log_in.html')

	form = TransactionForm(request.POST or None)

	if form.is_valid():
		trans = form.save(commit=False)
		trans.user = request.user
		trans.save()
		return index(request)

	return render(request, 'login/add_transaction.html', {'form': form})


def add_category(request):
	
	if not request.user.is_authenticated():
		return render(request, 'login/log_in.html')

	form = CategoryForm(request.POST or None)

	if form.is_valid():
		category = form.save(commit=False)
		category.save()
		return index(request)

	return render(request, 'login/add_category.html', {'form': form})









