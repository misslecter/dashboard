export default class Note {

	constructor() {
		this.text = '';
	}

	render() {
		const markup = `<div class="person">
		<h2>
		${this.text}
		</h2>
			</div>`;

		return markup;
 
	}
}