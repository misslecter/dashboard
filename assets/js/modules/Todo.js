export default class Todo {

	constructor(uid, t = 'Enter title...', el = null, c = null, r = null, items = []) {
		this.uid = uid;
		this.title = t;
		this.element = el;
		this.editable = c;
		this.removeBtn = r;

		this.items = [];

		this.parseItems(items);
	}

	parseItems(items) {
		$.each(items, (key, value) => {
			let i = new TodoItem(value.text, value.checked, value.id);
			this.items.push(i);
		});
	}

	render() {
		let element = $(`<div id="todo-` + this.uid + `" class="module todo" draggable="true"></div>`);
		let wrapper = $(`<div class="wrapper"></div>`);
		let title = $(`<h1 class="title" contenteditable="true">` + this.title + `</h1>`);
		let items = $(`<ul class="items"></ul>`);

		this.items.forEach((i) => items.append(this.renderItem(i)));

		let form = $(`<form class="todo-new"><input type="text" name="new-todo" placeholder="New todo..."></form>`);
		let i = $(`<i class="fa fa-times-circle fa-lg"></i>`);

		wrapper.append(title);
		wrapper.append(items);
		wrapper.append(form);

		element.append(wrapper);
		element.append(i);

		return element;
	}

	handleUpdates(app) {

		// set elements
		this.element = $('#todo-' + this.uid);
		this.editable = this.element.find('.title');
		this.removeBtn = this.element.find('i');
		let form = this.element.find('form');

		// focus on editable editable
		this.editable.focus();

		// handle end of input
		this.editable.on('input', (e) => {
			this.title = $(e.currentTarget).text(); // set new text
			app.setObject('todos', this); // update globally
		});

		// handle removing
		this.removeBtn.on('click', (e) => {
			this.element.remove(); // remove from HTML
			app.removeObject('todos', this); // remove globally
		});

		// handle adding new todoItem
		form.on('submit', (e) => {
			e.preventDefault();
			let todoText = form.find("input").val();
			this.addItem(app, todoText);
			app.setObject('todos', this); // update globally
		});

		this.items.forEach((i) => {
			// handle checking items
			$("#item" + i.id).on('click', (e) => {
				i.checked = !i.checked;
				app.setObject('todos', this); // update globally
			});

			// handle removing items
			$("#item" + i.id + " ~ span").on('click', (e) => {

				// remove from list
				this.items = $.grep(this.items, function(e){
					return e.id != i.id;
				});

				app.setObject('todos', this); // update globally

				// remove from HTML
				$(e.target.parentElement).remove();
			});

		});
	}

	addItem(app, text) {
		let item = new TodoItem(text, false, this.items.length);
		this.items.push(item);

		let ul = this.element.find('ul.items');
		ul.append(this.renderItem(item));

		app.setObject('todos', this); // update globally
	}

	renderItem(item) {
		let checked = item.checked ? "checked" : "";
		return $(`<li><input id="item` + item.id + `" type="checkbox"` + checked + `>
                        <label for="item` + item.id + `">` + item.text + `</label>
                        <span class="fa fa-times fa-md"></span></li>`);
	}
}

class TodoItem {
	constructor(text = '', checked = false, id = null) {
		this.text = text;
		this.checked = checked;
		this.id = id;
	}
}