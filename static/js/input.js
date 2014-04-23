var jobs = [];
var machines = [];

var jobId = 0;
var machineId = 0;

$('#jobForm').hide();
$('#machineForm').hide();
$('#successNotification').hide();
$('#leForm').hide();

$( ".sortable" ).sortable();
$( ".sortable" ).disableSelection();

$('#addJob').click(function(){
	jobs.push({
		'id': (++jobId).toString(),
		'size': 1,
		'pref': [],
	});
	
	addToTable('jobsTable', 'job_', jobId);
	assignJobClickHandler('job_'+jobId);
});

$('#addMachine').click(function(){
	machines.push({
		'id': (++machineId).toString(),
		'capacity': 1,
		'pref': [],
	});
	
	addToTable('machinesTable', 'machine_', machineId);
	assignMachineClickHandler('machine_'+machineId);
});

function assignJobClickHandler(id)
{
	$('#'+id).click(jobClickHandler);
}

function assignMachineClickHandler(id)
{
	$('#'+id).click(machineClickHandler);
}

function jobClickHandler()
{
	$('#machineForm').hide();
	$('#jobForm').fadeIn();

	var id = $(this).attr('id').substr($(this).attr('id').indexOf("_") + 1);
	var size;
	var preferences;
	var job;

	for (i in jobs)
	{
		if (jobs[i]['id'] == id)
		{
			job = jobs[i];
			size = jobs[i]['size'];
			preferences = jobs[i]['pref'];
			break;
		}
	}

	$('#jobForm #id').val(id);
	$('#jobForm #size').val(size);

	$('#jobForm #selectedPreference').empty();
	// $('#jobForm #selectedPreference').buttonset('destroy');
	for (i in machines)
	{
		var input_elem = $("<input>", {id: 'select_machine_'+machines[i]['id'], type: "checkbox", value: machines[i]['id']});
		if (job['pref'].indexOf(machines[i]['id'].toString()) != -1)
		{
			input_elem.prop('checked', true);
		}
		input_elem.change(selectedPreferenceHandler);

		var label_elem = $("<label>", {for: 'select_machine_'+machines[i]['id']});
		label_elem.append(machines[i]['id']);

		$('#jobForm #selectedPreference').append(input_elem).append(label_elem);
	}
	$('#jobForm #selectedPreference').buttonset();

	evalOrderedPreference();
}

function machineClickHandler()
{
	$('#jobForm').hide();
	$('#machineForm').fadeIn();

	var id = $(this).attr('id').substr($(this).attr('id').indexOf("_") + 1);
	var capacity;
	var preferences;
	var machine;

	for (i in machines)
	{
		if (machines[i]['id'] == id)
		{
			machine = machines[i];
			capacity = machines[i]['capacity'];
			preferences = machines[i]['pref'];
			break;
		}
	}

	$('#machineForm #id').val(id);
	$('#machineForm #capacity').val(capacity);

	$('#machineForm #selectedPreference').empty();
	// $('#machineForm #selectedPreference').buttonset('destroy');
	for (i in jobs)
	{
		var input_elem = $("<input>", {id: 'select_job_'+jobs[i]['id'], type: "checkbox", value: jobs[i]['id']});
		if (machine['pref'].indexOf(jobs[i]['id'].toString()) != -1)
		{
			input_elem.prop('checked', true);
		}
		input_elem.change(selectedPreferenceHandler);
		
		var label_elem = $("<label>", {for: 'select_job_'+jobs[i]['id']});
		label_elem.append(jobs[i]['id']);

		$('#machineForm #selectedPreference').append(input_elem).append(label_elem);
	}
	$('#machineForm #selectedPreference').buttonset();

	evalOrderedPreference();
}

function selectedPreferenceHandler()
{
	var itemId;
	var items;
	if ($("#jobForm").is(":visible"))
	{
		itemId = $("#jobForm #id").val()
		items = jobs;

	}
	else if ($("#machineForm").is(":visible"))
	{
		itemId = $("#machineForm #id").val()
		items = machines;
	}

	for (i in items)
	{
		if (items[i]['id']==itemId)
		{
			if ($(this).is(':checked'))
			{
				if (items[i]['pref'].indexOf($(this).val()) == -1)
				{
					items[i]['pref'].push($(this).val());
				}
			}
			else
			{
				if (items[i]['pref'].indexOf($(this).val()) != -1)
				{
					items[i]['pref'].splice(items[i]['pref'].indexOf($(this).val()), 1);
				}
			}
			break;
		}
	}

	evalOrderedPreference();
}

function evalOrderedPreference()
{
	if ($("#jobForm").is(":visible"))
	{
		form = 'jobForm';
		needle = $('#jobForm #id').val()
		haystack = jobs;

	}
	else if ($("#machineForm").is(":visible"))
	{
		form = 'machineForm';
		needle = $('#machineForm #id').val()
		haystack = machines;
	}

	$('#'+form+' #orderedPreference').empty();
	for (i in haystack)
	{
		if (haystack[i]['id'] == needle)
		{
			for (j in haystack[i]['pref'])
			{
				$('#'+form+' #orderedPreference').append(
					'<li id="'+haystack[i]['pref'][j]+'" class="ui-state-default">'+haystack[i]['pref'][j]+'</li>'
				);
			}
			break;
		}
	}
}

$('#jobForm').submit(function(){
	var id = $('#id', this).val();
	var size = $('#jobForm #size').val();
	var pref = $('#jobForm #orderedPreference').sortable("toArray");

	for (i in jobs)
	{
		if (jobs[i]['id'] == id)
		{
			jobs[i]['size'] = parseInt(size);
			jobs[i]['pref'] = pref;
			break;
		}
	}

	$('#jobForm').hide();
	displaySuccess();

	return false;
});

$('#machineForm').submit(function(){
	var id = $('#id', this).val();
	var capacity = $('#capacity', this).val();
	var pref = $('#machineForm #orderedPreference').sortable("toArray");

	for (i in machines)
	{
		if (machines[i]['id'] == id)
		{
			machines[i]['capacity'] = parseInt(capacity);
			machines[i]['pref'] = pref;
			break;
		}
	}

	$('#machineForm').hide();
	displaySuccess();

	return false;
});

function addToTable(table, idPrefix, item)
{
	$('#'+table+' > tbody:last').append('<tr id="'+idPrefix+item+'"><td>'+item+'</td></tr>');
}

$('#goToSaved').click(function(){
	alert("notImplemented");
});

$('#reset').click(function(){
	alert("notImplemented");
});

function displaySuccess()
{
	$('#successNotification').fadeIn();
	$('#successNotification').fadeOut('slow');
}

$('#submit').click(function(){

	var output = {'jobs': jobs, 'machines': machines}

	$('#leForm #output').val(JSON.stringify(output));
	$('#leForm').submit();
});