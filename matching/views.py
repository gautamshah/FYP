from django.shortcuts import render
from Lib import RevisedDeferredAcceptance


# Create your views here.
def leAdder(request):
	foo = RevisedDeferredAcceptance()

	foo.machines = [
		{
			'id': 'A',
			'capacity': 2,
			'preference': ['c', 'a', 'b'],
		},
		{
			'id': 'B',
			'capacity': 1,
			'preference': ['b', 'c'],
		},
	]

	foo.jobs = [
		{
			'id': 'a',
			'size': 2,
			'preference': ['A'],
		},
		{
			'id': 'b',
			'size': 1,
			'preference': ['A', 'B'],
		},
		{
			'id': 'c',
			'size': 1,
			'preference': ['B', 'A'],	
		},
	]

	foo.run()

	nodes = []
	edges = []
	ct = 0
	for each in foo.matching:
		ct += 1
		nodes.append({'id':ct, 'label':each[0]['id']})
		ct += 1
		nodes.append({'id':ct, 'label':each[1]['id']})

		edges.append({'from': ct-1, 'to':ct})

	output = {'nodes':nodes, 'edges':edges}

	return render(request, 'index.html', {'output':output})