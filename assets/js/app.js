import Svg from "./app/svg";
import Form from "./app/form";
import Time from "./app/time";
import Background from "./app/flickr";

import Dashboard from "./modules/Dashboard";

const menuBtn = $('header button'),
	plusBtn = $('.add-new button'),
	addNewBtns = $('.add-new__choice a'),
	link = $('header .link a'),
	main = $('main'),
	fileInput = $('#file-selector'),
	refreshLink = $('#refreshBg'),
	b = $('body');

$(document).ready(() => {

	updateAppBackground();



	$('#app-theme-selector + label').click((e) => {
		if($('#app-theme-selector').is(':checked')) {
			// switch to light
			localStorage.setItem('app-theme', 'app-theme-light');
			b.removeClass('app-theme-dark').addClass('app-theme-light');
		} else {
			localStorage.setItem('app-theme', 'app-theme-dark');
			b.removeClass('app-theme-light').addClass('app-theme-dark');
		}
	});

	$('.app-background-change').click((e) => {
		let selectedTheme = $(e.currentTarget).attr('for');
		localStorage.setItem('app-background', selectedTheme);

		fileInput.prop('disabled', !(selectedTheme == 'app-background-custom'));
		refreshLink.toggleClass('disabled', !(selectedTheme == 'app-background-flickr'));

		updateAppBackground();
	});


	fileInput.on('change', (event) => {
		let img = event.target.files[0];
		console.log(img);

		// Only process image files.
		if (!img.type.match('image.*')) return;

		var reader = new FileReader();
		reader.onload = ((theFile) => {
			return (e) => {
				localStorage.setItem('background-custom', e.target.result);
				updateAppBackground();
			};
		})(img);

		// Read in the image file as a data URL.
		reader.readAsDataURL(img);


	});

	$(".open-settings-menu").click((e) => {
		e.preventDefault();
		$(e.currentTarget).toggleClass('menu-opened');
		$(".settings-menu").toggle();
	});




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

const updateAppBackground = () => {

	let appBg = localStorage.getItem('app-background'),
		appTheme = localStorage.getItem('app-theme');

	if(appBg == null) appBg = 'app-background-default';
	if(appTheme == null) appTheme = 'app-theme-light';

	if(appBg == 'app-background-flickr') {
		Background();
	} else if(appBg == 'app-background-default') {
		main.removeAttr('style');
	} else if(appBg == 'app-background-custom') {

		let img = localStorage.getItem('background-custom');
		if (img == null) return;

		main.css({'background': 'url(' + img + ')'});
		fileInput.prop('disabled', false);
	}


	b.removeAttr("class");
	b.addClass(appBg);
	b.addClass(appTheme);
	$('#' + appBg).prop("checked", true);
	$('#app-theme-selector').prop("checked", appTheme == 'app-theme-dark');
};