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
		if (this.get('hidden') === false){
			this.set('hidden', true) 
		} else {
			this.set('hidden', false)
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

	// Update Status
	var thisTask = event.target.id;
	var taskInstance = allTodos.findWhere({ _id: thisTask });
	taskInstance.toggleStatus();

});

// Delete Item
list.on('click', 'span', function (e){
	e.preventDefault();

	// Delete from List
	var dltTask = $(event.target).parent();
	$(dltTask).addClass('hidden');

	// Updated Hidden
	var dltID = $(event.target).parent()[0].id;
	var dltInstance = allTodos.findWhere({ _id: dltID });
	dltInstance.toggleDelete();


});







