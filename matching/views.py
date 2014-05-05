from django.shortcuts import render
from Lib import RevisedDeferredAcceptance
import json
from django.contrib.auth.decorators import login_required


@login_required
def leAdder(request):
	inp = json.loads(request.POST['output'])

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
