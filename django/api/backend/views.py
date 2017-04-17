from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
	return HttpResponse({'somefield':'somevalue'}, status=200, content_type='application/json')