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

	// Load data from LS
	app.loadData();

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
    header = $('header'),
    addNewNav = $('.add-new__choice');

var App = (function () {
	function App() {
		_classCallCheck(this, App);

		this.notes = {};
		this.todos = [];
		this.counters = [];
		this.photos = [];
	}

	App.prototype.handleNavBtnClick = function handleNavBtnClick(clickedElement) {
		$(clickedElement).toggleClass('nav-opened');
		header.toggleClass('nav-opened');
		nav.toggleClass('opened');
	};

	App.prototype.handlePlusBtnClick = function handlePlusBtnClick(clickedElement) {
		$(clickedElement).toggleClass('active');
		addNewNav.fadeToggle().toggleClass('opened');
	};

	App.prototype.handleAddNewBtnClick = function handleAddNewBtnClick(clickedElement) {
		switch ($(clickedElement).data('target')) {
			case 'note':
				this.addNote();
				break;
		}
	};

	// NOTES //

	App.prototype.addNote = function addNote() {
		var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

		var note = undefined;

		if (data != null) {
			note = new _Note2['default'](data.uid, data.text, data.element, data.content, data.removeBtn);
		} else {
			note = new _Note2['default'](this.generateId());
		}

		// set to global object
		this.setNote(note);

		// update html
		this.updateHtml(note);

		note.handleUpdates(this);
	};

	App.prototype.setNote = function setNote(note) {

		// let a = [];
		// a[123] = 321;
		// this.notes = map;

		// console.log(a);
		// console.log(instanceof map);

		// map.set(1, 2);
		// this.notes.toString();
		// this.notes.set(1, 2);
		// this.notes.set(note.uid, note);
		this.notes[note.uid] = note;
		this.updateStorage();
	};

	App.prototype.removeNote = function removeNote(note) {
		// this.notes.remove(note);
		delete this.notes[note.uid];
		this.updateStorage();
	};

	// pool

	App.prototype.updateStorage = function updateStorage() {
		localStorage.setItem('notes', JSON.stringify(this.notes));
	};

	App.prototype.loadData = function loadData() {
		var _this = this;

		// localStorage.clear();
		var notes = localStorage.getItem('notes');
		if (notes) {
			this.notes = JSON.parse(notes);
			$.each(this.notes, function (key, value) {
				return _this.addNote(value);
			});
		}
	};

	App.prototype.updateHtml = function updateHtml(el) {
		main.append(el.render());
	};

	App.prototype.generateId = function generateId() {
		return Math.floor(1000 + Math.random() * 9000);
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
	function Note(uid) {
		var t = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
		var el = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
		var c = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
		var r = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

		_classCallCheck(this, Note);

		this.uid = uid;
		this.text = t;
		this.element = el;
		this.content = c;
		this.removeBtn = r;
	}

	Note.prototype.render = function render() {
		var element = $('<div id="note-' + this.uid + '" class="module note" draggable="true"></div>');
		var content = $('<div class="content" contenteditable="true">' + this.text + '</div>');
		var i = $('<i class="fa fa-times-circle fa-lg"></i>');

		element.append(content);
		element.append(i);

		return element;
	};

	Note.prototype.handleUpdates = function handleUpdates(app) {
		var _this = this;

		// set elements
		this.element = $('#note-' + this.uid);
		this.content = this.element.find('.content');
		this.removeBtn = this.element.find('i');

		// focus on editable content
		this.content.focus();

		// handle end of input
		this.content.on('input', function (e) {
			_this.text = $(e.currentTarget).text(); // set new text
			app.setNote(_this); // update globally
		});

		// handle removing
		this.removeBtn.on('click', function (e) {
			_this.element.remove(); // remove from HTML
			app.removeNote(_this); // remove globally
		});
	};

	return Note;
})();

exports['default'] = Note;
module.exports = exports['default'];

},{}]},{},[1]);
