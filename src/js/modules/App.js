import Note from "./Note";
const main = $('main'),
	nav = $('nav'),
	addNewNav = $('.add-new__choice');


export default class App {

	constructor() {
		this.notes = [];
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
				this.addNewNote();
				break;
		}
	}

	addNewNote() {
		let note = new Note();
		this.appendToMain(note.render());
	}

	appendToMain(html) {
		main.append(html);
	}
}
