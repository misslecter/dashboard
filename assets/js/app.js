import Svg from "./modules/Svg";
import Form from "./modules/Form";
import App from "./modules/App";

const menuBtn = $('header button'),
	plusBtn = $('.add-new button'),
	addNewBtns = $('.add-new__choice a'),
	link = $('header .link a');

$(document).ready(() => {

	Svg();
	Form();

	// set visible
	if (location.hash == '') {
		location.hash = '#dashboard';
	} else {
		$('.link-to-dashboard').toggle();
		$('.link-to-contact').toggle();
	}

	link.on('click', (e) => {
		$('.link-to-dashboard').toggle();
		$('.link-to-contact').toggle();

		// $('#dashboard').animate({
		// 	width: "toggle"
		// });
		//
		$('#contact').toggleClass('closed');
	});


	const app = new App();

	// Load data from LS
	app.loadData();

	// Open navigation
	menuBtn.click((e) => app.handleNavBtnClick(e.currentTarget));

	// Show add new menu
	plusBtn.click((e) => app.handlePlusBtnClick(e.currentTarget));

	// Handle adding new stuff
	addNewBtns.map((index, el) => $(el).click((e) => app.handleAddNewBtnClick(e.currentTarget)));

});