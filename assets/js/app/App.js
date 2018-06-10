import Note from "../modules/Note";
import Counter from "../modules/Counter";
import Todo from "../modules/Todo";

const main = $('main'),
	nav = $('nav'),
	header = $('header'),
	addNewNav = $('.add-new__choice');


export default class App {

	constructor() {
		this.notes = {};
		this.todos = {};
		this.counters = {};
	}

	handleNavBtnClick(clickedElement) {
		$(clickedElement).toggleClass('nav-opened');
		header.toggleClass('nav-opened');
		nav.toggleClass('opened');

		let notesHolder = $('#nav-notes'),
			todosHolder = $('#nav-todos'),
			countersHolder = $('#nav-counters');

		if (Object.keys(this.notes).length > 0) {
			notesHolder.html('');
			$.each(this.notes, (key, note) => {
				notesHolder.append('<li><a href="">' + note.text.substr(0, 20) + '</a></li>');
			})
		}

		if (Object.keys(this.todos).length > 0) {
			todosHolder.html('');
			$.each(this.todos, (key, todo) => {
				todosHolder.append('<li><a href="">' + todo.title.substr(0, 20) + '</a></li>');
			})
		}

		if (Object.keys(this.counters).length > 0) {
			countersHolder.html('');
			$.each(this.counters, (key, counter) => {
				countersHolder.append('<li><a href="">' + counter.title.substr(0, 20) + '</a></li>');
			})
		}

		nav.find('a').on('click', (e) => {
			e.preventDefault();
			$(clickedElement).toggleClass('nav-opened');
			header.toggleClass('nav-opened');
			nav.toggleClass('opened');

			// todo: scroll
		})
	}
	
	handlePlusBtnClick(clickedElement) {
		$(clickedElement).toggleClass('active');
		addNewNav.fadeToggle().toggleClass('opened');
	}

	handleAddNewBtnClick(clickedElement) {
		switch ($(clickedElement).data('target')) {
			case 'note':
				this.addNote();
				break;
			case 'counter':
				this.addCounter();
				break;
			case 'todo':
				this.addTodo();
				break;
			default:
				return;
		}
	}

	// NOTES //

	addNote(data = null) {

		let note;

		if(data != null) {
			note = new Note(data.uid, data.text);
		} else {
			note = new Note(this.generateId());
		}

		// set to global object
		this.setObject('notes', note);

		// update html
		this.updateHtml(note);

		note.handleUpdates(this);
	}

	setObject(what, e) {
		switch (what) {
			case 'notes':
				this.notes[e.uid] = e;
				localStorage.setItem(what, JSON.stringify(this.notes));
				break;
			case 'counters':
				this.counters[e.uid] = e;
				localStorage.setItem(what, JSON.stringify(this.counters));
				break;
			case 'todos':
				this.todos[e.uid] = e;
				localStorage.setItem(what, JSON.stringify(this.todos));
				break;
			default:
				return;
		}
	}

	removeObject(what, e) {
		switch (what) {
			case 'notes':
				delete this.notes[e.uid];
				localStorage.setItem(what, JSON.stringify(this.notes));
				break;
			case 'counters':
				delete this.counters[e.uid];
				localStorage.setItem(what, JSON.stringify(this.counters));
				break;
			case 'todos':
				delete this.todos[e.uid];
				localStorage.setItem(what, JSON.stringify(this.todos));
				break;
			default:
				return;
		}
		// this.updateStorage(what);
	}

	// COUNTER //

	addCounter(data = null) {

		let counter;

		if(data != null) {
			counter = new Counter(data.uid, data.title, data.date, data.diff);
		} else {
			counter = new Counter(this.generateId());
		}

		// set to global object
		this.setObject('counters', counter);

		// update html
		this.updateHtml(counter);

		counter.handleUpdates(this);
	}

	addTodo(data = null) {

		let todo;

		if(data != null) {
			todo = new Todo(data.uid, data.title, data.items);
		} else {
			todo = new Todo(this.generateId());
		}

		// set to global object
		this.setObject('todos', todo);

		// update html
		this.updateHtml(todo);

		todo.handleUpdates(this);
	}

	loadData() {
		let notes = localStorage.getItem('notes');
		if (notes) {
			this.notes = JSON.parse(notes);
			$.each(this.notes, (key, value) => this.addNote(value));
		}
		let counters = localStorage.getItem('counters');
		if (counters) {
			this.counters = JSON.parse(counters);
			$.each(this.counters, (key, value) => this.addCounter(value));
		}
		let todos = localStorage.getItem('todos');
		if (todos) {
			this.todos = JSON.parse(todos);
			$.each(this.todos, (key, value) => this.addTodo(value));
		}
	}

	updateHtml(el) {
		main.append(el.render());
	}

	generateId() {
		return Math.floor(1000 + Math.random() * 9000);
	}

	loadSampleData() {
		localStorage.clear();
		this.addNote({"uid": this.generateId(), "text": "Tact is the art of making a point without making an enemy."});
		this.addNote({"uid": this.generateId(), "text": "What animal represents Scotland?<br>The unicorn is the national animal of Scotland. The Royal Coat of Arms of Scotland, used prior to 1603 by the Kings of Scotland was supported by two unicorns and the current royal coat of arms of the United Kingdom is supported by a unicorn for Scotland along with a lion for England."});

		let dateObject = new Date(2018, 5, 21);
		let d = new Date();
		let diff = Math.floor((dateObject.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)) + 1;
		this.addCounter({"uid": this.generateId(), "title":"Aerodrome Festival","date":"21. 06. 2018","diff":diff})

		this.addTodo({"uid":6686,"title":"Summer plans","items":[{"text":"move to new apartment","checked":false,"id":"6686-0"},{"text":"go for holiday","checked":false,"id":"6686-1"},{"text":"be awesome!","checked":true,"id":"6686-2"}]});

		this.addTodo({"uid":2506,"title":"New clothes","items":[{"text":"shorts","checked":false,"id":"2506-0"},{"text":"skirts","checked":false,"id":"2506-1"},{"text":"shoes","checked":false,"id":"2506-2"}]});
	}
}
