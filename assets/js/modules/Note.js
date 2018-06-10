export default class Note {

	constructor(uid, t = '') {
		this.uid = uid;
		this.text = t;
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
		let element = $('#note-' + this.uid);
		let editable = element.find('.content');
		let removeBtn = element.find('i');

		// focus on editable editable
		editable.focus();

		// handle end of input
		editable.on('input', (e) => {
			this.text = $(e.currentTarget).text(); // set new text
			app.setObject('notes', this); // update globally
		});

		// handle removing
		removeBtn.on('click', (e) => {
			element.remove(); // remove from HTML
			app.removeObject('notes', this); // remove globally
		})
	}
}