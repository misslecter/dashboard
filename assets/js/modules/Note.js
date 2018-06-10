export default class Note {

	constructor(uid, t = '', el = null, c = null, r = null) {
		this.uid = uid;
		this.text = t;
		this.element = el;
		this.editable = c;
		this.removeBtn = r;
	}

	render() {
		let element = $(`<div id="note-` + this.uid + `" class="module note" draggable="true"></div>`);
		let content = $(`<div class="content" contenteditable="true">` + this.text + `</div>`);
		let i = $(`<i class="fa fa-times-circle fa-lg"></i>`);

		element.append(content);
		element.append(i);

		return element;
	}

	handleUpdates(app) {

		// set elements
		this.element = $('#note-' + this.uid);
		this.editable = this.element.find('.content');
		this.removeBtn = this.element.find('i');

		// focus on editable editable
		this.editable.focus();

		// handle end of input
		this.editable.on('input', (e) => {
			this.text = $(e.currentTarget).text(); // set new text
			app.setObject('notes', this); // update globally
		});

		// handle removing
		this.removeBtn.on('click', (e) => {
			this.element.remove(); // remove from HTML
			app.removeObject('notes', this); // remove globally
		})
	}
}