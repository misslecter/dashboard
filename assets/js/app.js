import Svg from "./modules/Svg";
import Form from "./modules/Form";
import Time from "./modules/time";

import App from "./modules/App";

const menuBtn = $('header button'),
	plusBtn = $('.add-new button'),
	addNewBtns = $('.add-new__choice a'),
	link = $('header .link a');

$(document).ready(() => {

	Svg();
	Form();
	Time();

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

	//todo + aktualizace
	let dp = $(".datepicker");
	dp.datepicker({
		dateFormat: 'dd. mm. yy',
		onSelect: function() {
			let dateObject = $(this).datepicker('getDate');
			let d = new Date();

			let millisecondsPerDay = 1000 * 60 * 60 * 24;

			let millisBetween = dateObject.getTime() - d.getTime();
			let days = millisBetween / millisecondsPerDay;

			let diff = Math.floor(days);

			$('.days-left').html('<span>' + diff + '</span>days left');
		}
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