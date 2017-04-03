from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import UserForm
from .models import Transaction

def index(request) :
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






