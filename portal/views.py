from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib import auth

def register(request):
	if request.method == 'POST':
		# TODO: If username already exists, ask the user to fuck off
		user = User.objects.create_user(
			username = request.POST['username'],
			password = request.POST['password'],
		)
		
		return HttpResponseRedirect('/login/')
	else:
		return render(request, 'register.html')

def login(request):
	if request.method == 'POST':
		username = request.POST['username']
		password = request.POST['password']
		user = auth.authenticate(username=username, password=password)
		if user is not None:
			auth.login(request, user)
			return HttpResponseRedirect('/input/')
		else:
			return HttpResponse("Failure")

	else:
		return render(request, 'login.html')

def logout(request):
	auth.logout(request)
	return HttpResponseRedirect('/login/')
