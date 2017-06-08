//What happens when update button is triggered
/*var update = document.getElementById('update');

update.addEventListener('click', function() {
	//Send PUT Request here -- using the FETCH API
	fetch('users', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify ({
			'firstName': 'Alan',
			'lastName': 'Devlin',
			'email':'alandevlin1@gmail.com'
		})
	
	}).then(res => {
	if(res.ok) return res.json()
}).then(data => {
	console.log(data);
	//Update the DOM to show users change
	window.location.reload(true);
})
});*/


//What happens when delete button is triggered

function deleteItem(item) {
	fetch('items', {
		method: 'delete',
		headers: {
			'Content-Type':'application/json'
		},
		body: JSON.stringify({
			'todo': item
		})
	}).then(res => {
		if(res.ok) return res.json();
	}).then(data => {
		console.log(data);
		window.location.reload(true);
	})
}

function updateItem(item)  {
	alert("Updating item: " + item);
	var list_item_text = document.getElementById('list_item');
	var update_button = document.getElementById('update');
	var delete_button = document.getElementById('delete');
	//Get value of item
	var item = list_item_text.textContent;
	alert(item);
	//Hide span and buttons
	list_item_text.style.visibility = "hidden";
	update_button.style.visibility = "hidden";
	delete_button.style.visibility = "hidden";
	
	//Create a text box
	var input_text = document.createElement("input");
	input_text.setAttribute('type', 'text');
	input_text.setAttribute('value', 'item');
	/*fetch('items', {
		method: 'put',
		headers: {'Content-Type':'application/json'},
		body: JSON.stringify ({
			'*/
}


