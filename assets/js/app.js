import Svg from "./app/svg";
import Form from "./app/form";
import Time from "./app/time";
import Background from "./app/flickr";

import Dashboard from "./modules/Dashboard";

const menuBtn = $('header button'),
	plusBtn = $('.add-new button'),
	addNewBtns = $('.add-new__choice a'),
	link = $('header .link a');

$(document).ready(() => {

	Background();


	const dashboard = new Dashboard();

	// set visible
	if(localStorage.getItem('welcomeClosed') == 1) {
		location.hash = location.hash == '' ? '#dashboard' : location.hash;

		// Load data from LS
		dashboard.loadData();
	} else {
		location.hash = '#welcome';
	}

	$('#welcome a').on('click', (e) => {
		localStorage.clear();
		localStorage.setItem('welcomeClosed', 1);

		if(localStorage.getItem('sampleLoaded') != 1 && $(e.currentTarget).hasClass('sample')) {
			dashboard.loadSampleData();
		}
	});

	// Open navigation
	menuBtn.click((e) => dashboard.handleNavBtnClick(e.currentTarget));

	// Show add new menu
	plusBtn.click((e) => dashboard.handlePlusBtnClick(e.currentTarget));

	// Handle adding new stuff
	addNewBtns.map((index, el) => $(el).click((e) => {
		e.preventDefault();
		dashboard.handleAddNewBtnClick(e.currentTarget)
	}));

	Svg();
	Form();
	Time();


});