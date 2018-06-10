import Note from "./Note";
import Counter from "./Counter";

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
			default:
				return;
		}
	}

	// NOTES //

	addNote(data = null) {

		let note;

		if(data != null) {
			note = new Note(data.uid, data.text, data.element, data.editable, data.removeBtn);
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
			case 'todo':
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
			case 'todo':
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
			counter = new Counter(data.uid, data.title, data.element, data.editable, data.removeBtn, data.date, data.diff);
		} else {
			counter = new Counter(this.generateId());
		}

		// set to global object
		this.setObject('counters', counter);

		// update html
		this.updateHtml(counter);

		counter.handleUpdates(this);
	}

	loadData() {
		// localStorage.clear();

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
	}

	updateHtml(el) {
		main.append(el.render());
	}

	generateId() {
		return Math.floor(1000 + Math.random() * 9000);
	}
}
