import Svg from "./modules/Svg";
import App from "./modules/App";

const menuBtn = $('header button'),
	plusBtn = $('.add-new button'),
	addNewBtns = $('.add-new__choice a');

$(document).ready(() => {

	Svg();

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