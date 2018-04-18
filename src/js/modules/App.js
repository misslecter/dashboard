import Note from "./Note";
const main = $('main'),
	nav = $('nav'),
	addNewNav = $('.add-new__choice');


export default class App {

	constructor() {
		this.notes = {};
		this.todos = [];
		this.counters = [];
		this.photos = [];
	}


	handleNavBtnClick(clickedElement) {
		$(clickedElement).toggleClass('nav-opened');
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
		}
	}

	// NOTES //

	addNote(data = null) {

		let note;

		if(data != null) {
			note = new Note(data.uid, data.text, data.element, data.content, data.removeBtn);
		} else {
			note = new Note(this.generateId());
		}

		// set to global object
		this.setNote(note);

		// update html
		this.updateHtml(note);

		note.handleUpdates(this);
	}

	setNote(note) {

		// let a = [];
		// a[123] = 321;
		// this.notes = map;


		// console.log(a);
		// console.log(instanceof map);

		// map.set(1, 2);
		// this.notes.toString();
		// this.notes.set(1, 2);
		// this.notes.set(note.uid, note);
		this.notes[note.uid] = note;
		this.updateStorage();
	}

	removeNote(note) {
		// this.notes.remove(note);
		delete this.notes[note.uid];
		this.updateStorage();
	}

	// pool

	updateStorage() {
		localStorage.setItem('notes', JSON.stringify(this.notes));
	}

	loadData() {
		// localStorage.clear();
		let notes = localStorage.getItem('notes');
		if (notes) {
			this.notes = JSON.parse(notes);
			$.each(this.notes, (key, value) => this.addNote(value));
		}
	}

	updateHtml(el) {
		main.append(el.render());
	}



	generateId() {
		return Math.floor(1000 + Math.random() * 9000);
	}
}
