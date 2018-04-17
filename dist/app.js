(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modulesApp = require("./modules/App");

var _modulesApp2 = _interopRequireDefault(_modulesApp);

var menuBtn = $('header button'),
    plusBtn = $('.add-new button'),
    addNewBtns = $('.add-new__choice a');

$(document).ready(function () {

	var app = new _modulesApp2['default']();

	// Open navigation
	menuBtn.click(function (e) {
		return app.handleNavBtnClick(e.currentTarget);
	});

	// Show add new menu
	plusBtn.click(function (e) {
		return app.handlePlusBtnClick(e.currentTarget);
	});

	// Handle adding new stuff
	addNewBtns.map(function (index, el) {
		return $(el).click(function (e) {
			return app.handleAddNewBtnClick(e.currentTarget);
		});
	});
});

},{"./modules/App":2}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Note = require("./Note");

var _Note2 = _interopRequireDefault(_Note);

var main = $('main'),
    nav = $('nav'),
    addNewNav = $('.add-new__choice');

var App = (function () {
	function App() {
		_classCallCheck(this, App);

		this.notes = [];
		this.todos = [];
		this.counters = [];
		this.photos = [];
	}

	App.prototype.handleNavBtnClick = function handleNavBtnClick(clickedElement) {
		$(clickedElement).toggleClass('nav-opened');
		nav.toggleClass('opened');
	};

	App.prototype.handlePlusBtnClick = function handlePlusBtnClick(clickedElement) {
		$(clickedElement).toggleClass('active');
		addNewNav.fadeToggle().toggleClass('opened');
	};

	App.prototype.handleAddNewBtnClick = function handleAddNewBtnClick(clickedElement) {
		switch ($(clickedElement).data('target')) {
			case 'note':
				this.addNewNote();
				break;
		}
	};

	App.prototype.addNewNote = function addNewNote() {
		var note = new _Note2['default']();
		this.appendToMain(note.render());
	};

	App.prototype.appendToMain = function appendToMain(html) {
		main.append(html);
	};

	return App;
})();

exports['default'] = App;
module.exports = exports['default'];

},{"./Note":3}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Note = (function () {
	function Note() {
		_classCallCheck(this, Note);

		this.text = '';
	}

	Note.prototype.render = function render() {
		var markup = '<div class="person">\n\t\t<h2>\n\t\t' + this.text + '\n\t\t</h2>\n\t\t\t</div>';

		return markup;
	};

	return Note;
})();

exports['default'] = Note;
module.exports = exports['default'];

},{}]},{},[1]);
