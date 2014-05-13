from django.shortcuts import render
from Lib import RevisedDeferredAcceptance
import json
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from matching.models import Saved


@login_required
def leAdder(request, savedId=None):
	if (savedId == None):
		inp = json.loads(request.POST['output'])
	else:
		inp = json.loads(Saved.objects.get(pk=savedId).conf)

	foo = RevisedDeferredAcceptance()

	foo.machines = []
	for each in inp['machines']:
		foo.machines.append({
			'id': each['id'].decode('unicode-escape'),
			'capacity': each['capacity'],
			'preference': each['pref'],
		})

	foo.jobs = []
	for each in inp['jobs']:
		foo.jobs.append({
			'id': each['id'].decode('unicode-escape'),
			'size': each['size'],
			'preference': each['pref'],
		})

	foo.run()

	nodes = []
	edges = []
	ct = 0
	for each in foo.matching:
		ct += 1
		nodes.append({'id':ct, 'label':each[0]['id'], 'group': "jobs"})
		ct += 1
		nodes.append({'id':ct, 'label':each[1]['id'], 'group': "machines"})

		edges.append({'from': ct-1, 'to':ct})

	output = {'nodes':nodes, 'edges':edges}

	return render(request, 'index.html', {'output':output})

@login_required
def input(request):
	return render(request, 'input.html')

@csrf_exempt
def save(request):
	Saved.objects.create(user=request.user, conf=request.POST['info'])
	return HttpResponse('Success')

def saved(request):
	saved = []
	for each in Saved.objects.all():
		if (each.user == request.user):
			saved.append((each.id, each.conf))
	return render(request, 'saved.html', {'saved': saved})
