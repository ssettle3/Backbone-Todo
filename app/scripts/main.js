// Todo Model
var Todo = Backbone.Model.extend({

	initialize: function (){
		console.log('A new Todo has been created');
	},

	idAttribute: '_id',

	defaults: {

		name: '',
		status: 'open',
		hidden: false,
	},

	toggleStatus: function (){
		if (status === 'open'){
			status === 'closed';
		} else {
			status === 'open';
		};
	},

	toggleDelete: function(){
		if (hidden === false){
			hidden === true;
		} else {
			hidden === false;
		};
	},

});

// Collection of Todo Items
var TodoCol = Backbone.Collection.extend ({

	initialize: function (){
		console.log('Collection Created');
	},

	model: Todo,

	url: 'http://tiy-atl-fe-server.herokuapp.com/collections/randomness',

});

// Create a Collection
var allTodos = new TodoCol();

// Variables
var form = $('#form');
var list = $('#list');
var item = new Todo();
var input = $('#input-todo');

// Fetch Data
allTodos.fetch().done( function(){
	console.log('fetched');

	// Put Fetched Data on Screen
	allTodos.each(function (item) {
		list.append(Handlebars.templates.todo(item.attributes));
	});

});

// Adding Todos
form.on('submit', function (e){
	e.preventDefault();
	var item = new Todo({ name: input.val() });

	// Add to Collection
	allTodos.add(item);

	// Make Visual
	list.prepend(Handlebars.templates.todo(item.attributes));

	//Push Todo Item to Server
	item.save().done();

	//Reset Form
	this.reset();
});

// Toggle Todo Open/Complete


// Delete Item







