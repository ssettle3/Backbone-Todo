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
		if (this.get('status') ==='open'){
			this.set('status', 'closed') 
		} else {
			this.set('status', 'open')
		};

	},

	toggleDelete: function(){
		
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
var input = $('#input-todo');

// Fetch Data
allTodos.fetch().done( function(){
	console.log('Data has been fetched');

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

	// Push Todo Item to Server
	item.save().done();

	// Reset Form
	this.reset();
});

// Toggle Todo Open/Complete
list.on('click', 'li', function (e){
	$(this).toggleClass('closed');

	var thisTask = event.target.id;
	var taskInstance = allTodos.findWhere({ _id: thisTask });
	taskInstance.toggleStatus();

});

// Delete Item
list.on('click', 'span', function (e){
	e.preventDefault();
	var dltTask = $(event.target).parent();

	// Delete from List
	$(dltTask).addClass('hidden');



});







