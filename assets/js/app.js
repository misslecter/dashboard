import Svg from "./app/Svg";
import Form from "./app/Form";
import Time from "./app/time";

import App from "./app/App";

const menuBtn = $('header button'),
	plusBtn = $('.add-new button'),
	addNewBtns = $('.add-new__choice a'),
	link = $('header .link a');

$(document).ready(() => {

	const app = new App();

	// Load data from LS
	app.loadData();

	// Open navigation
	menuBtn.click((e) => app.handleNavBtnClick(e.currentTarget));

	// Show add new menu
	plusBtn.click((e) => app.handlePlusBtnClick(e.currentTarget));

	// Handle adding new stuff
	addNewBtns.map((index, el) => $(el).click((e) => {
		e.preventDefault();
		app.handleAddNewBtnClick(e.currentTarget)
	}));

	Svg();
	Form();
	Time();

	// set visible
	if(localStorage.getItem('welcomeClosed') == 1) {
		location.hash = location.hash == '' ? '#dashboard' : location.hash;
	} else {
		location.hash = '#welcome';
	}

	$('#welcome a').on('click', (e) => {
		localStorage.setItem('welcomeClosed', 1);

		if($(e.currentTarget).hasClass('sample')) {
			app.loadSampleData();
		}
	});
});