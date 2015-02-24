(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['todo'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\n  <li id=\""
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\"> "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " <span> X </span> </li>";
},"useData":true});
templates['todoClosed'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "";
},"useData":true});
templates['todoComp'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <li id=\""
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"closed\"> "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " <span> X </span> </li>\n";
},"useData":true});
templates['todoDelete'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <li id=\""
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"hidden\"> "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " <span> X </span> </li>\n";
},"useData":true});
})();
.// Todo Model
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

	url: 'http://tiy-atl-fe-server.herokuapp.com/collections/randomness2',

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
		if (item.get('status') ==='closed'){
			list.append(Handlebars.templates.todoComp(item.attributes));
		} else { 
				list.append(Handlebars.templates.todo(item.attributes));
		}

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

	// Push to Server
	taskInstance.save();


});

// Delete Item
list.on('click', 'span', function (e){
	e.preventDefault();

	// Delete from List
	var dltTask = $(event.target).parent();
	console.log(dltTask);
	$(dltTask).addClass('hidden');

	// Updated Hidden
	var dltID = $(event.target).parent()[0].id;
	var dltInstance = allTodos.findWhere({ _id: dltID });
	dltInstance.toggleDelete();

	// Push to Server
	dltInstance.destroy();

});







