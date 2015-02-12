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

	// url: 

});




