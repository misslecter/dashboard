(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _modulesSvg = require("./modules/Svg");

var _modulesSvg2 = _interopRequireDefault(_modulesSvg);

var _modulesForm = require("./modules/Form");

var _modulesForm2 = _interopRequireDefault(_modulesForm);

var _modulesTime = require("./modules/time");

var _modulesTime2 = _interopRequireDefault(_modulesTime);

var _modulesApp = require("./modules/App");

var _modulesApp2 = _interopRequireDefault(_modulesApp);

var menuBtn = $('header button'),
    plusBtn = $('.add-new button'),
    addNewBtns = $('.add-new__choice a'),
    link = $('header .link a');

$(document).ready(function () {

	var app = new _modulesApp2["default"]();

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

	_modulesSvg2["default"]();
	_modulesForm2["default"]();
	_modulesTime2["default"]();

	// set visible
	if (location.hash == '') {
		location.hash = '#dashboard';
	} else {
		$('.link-to-dashboard').toggle();
		$('.link-to-contact').toggle();
	}

	link.on('click', function (e) {
		$('.link-to-dashboard').toggle();
		$('.link-to-contact').toggle();

		// $('#dashboard').animate({
		// 	width: "toggle"
		// });
		//
		$('#contact').toggleClass('closed');
	});
});

},{"./modules/App":2,"./modules/Form":4,"./modules/Svg":6,"./modules/time":7}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Note = require("./Note");

var _Note2 = _interopRequireDefault(_Note);

var _Counter = require("./Counter");

var _Counter2 = _interopRequireDefault(_Counter);

var main = $('main'),
    nav = $('nav'),
    header = $('header'),
    addNewNav = $('.add-new__choice');

var App = (function () {
	function App() {
		_classCallCheck(this, App);

		this.notes = {};
		this.todos = {};
		this.counters = {};
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
			case 'counter':
				this.addCounter();
				break;
			default:
				return;
		}
	};

	// NOTES //

	App.prototype.addNote = function addNote() {
		var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

		var note = undefined;

		if (data != null) {
			note = new _Note2["default"](data.uid, data.text, data.element, data.editable, data.removeBtn);
		} else {
			note = new _Note2["default"](this.generateId());
		}

		// set to global object
		this.setObject('notes', note);

		// update html
		this.updateHtml(note);

		note.handleUpdates(this);
	};

	App.prototype.setObject = function setObject(what, e) {
		switch (what) {
			case 'notes':
				this.notes[e.uid] = e;
				localStorage.setItem(what, JSON.stringify(this.notes));
				break;
			case 'counters':
				this.counters[e.uid] = e;
				localStorage.setItem(what, JSON.stringify(this.counters));
				break;
			case 'todo':
				this.todos[e.uid] = e;
				localStorage.setItem(what, JSON.stringify(this.todos));
				break;
			default:
				return;
		}
	};

	App.prototype.removeObject = function removeObject(what, e) {
		switch (what) {
			case 'notes':
				delete this.notes[e.uid];
				localStorage.setItem(what, JSON.stringify(this.notes));
				break;
			case 'counters':
				delete this.counters[e.uid];
				localStorage.setItem(what, JSON.stringify(this.counters));
				break;
			case 'todo':
				delete this.todos[e.uid];
				localStorage.setItem(what, JSON.stringify(this.todos));
				break;
			default:
				return;
		}
		// this.updateStorage(what);
	};

	// COUNTER //

	App.prototype.addCounter = function addCounter() {
		var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

		var counter = undefined;

		if (data != null) {
			counter = new _Counter2["default"](data.uid, data.title, data.element, data.editable, data.removeBtn, data.date, data.diff);
		} else {
			counter = new _Counter2["default"](this.generateId());
		}

		// set to global object
		this.setObject('counters', counter);

		// update html
		this.updateHtml(counter);

		counter.handleUpdates(this);
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
		var counters = localStorage.getItem('counters');
		if (counters) {
			this.counters = JSON.parse(counters);
			$.each(this.counters, function (key, value) {
				return _this.addCounter(value);
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

exports["default"] = App;
module.exports = exports["default"];

},{"./Counter":3,"./Note":5}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Counter = (function () {
	function Counter(uid) {
		var t = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
		var el = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
		var c = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
		var r = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
		var d = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];
		var diff = arguments.length <= 6 || arguments[6] === undefined ? '-' : arguments[6];

		_classCallCheck(this, Counter);

		this.uid = uid;
		this.title = t;
		this.element = el;
		this.editable = c;
		this.removeBtn = r;
		this.date = d;

		this.diff = diff;
	}

	Counter.prototype.render = function render() {
		var element = $('<div id="counter-' + this.uid + '" class="module counter" draggable="true"></div>');
		var wrapper = $('<div class="wrapper"></div>');
		var title = $('<div class="title" contenteditable="true">' + this.title + '</div>');
		var dateInput = $('<input type="text" class="datepicker" placeholder="Select date...">');
		var days = $('<div class="days-left"><span>' + this.diff + '</span>days left</div>');
		var hidden = $('<div class="hidden" id="#hidden-date-' + this.uid + '">' + this.date + '</div>');

		var i = $('<i class="fa fa-times-circle fa-lg"></i>');

		wrapper.append(title);
		wrapper.append(dateInput);
		wrapper.append(days);
		wrapper.append(hidden);

		element.append(wrapper);
		element.append(i);

		return element;
	};

	Counter.prototype.handleUpdates = function handleUpdates(app) {
		var _this = this;

		// set elements
		this.element = $('#counter-' + this.uid);
		this.editable = this.element.find('.title');
		this.removeBtn = this.element.find('i');
		var dateInput = this.element.find('.datepicker');
		var daysLeft = this.element.find('.days-left');
		var date = document.getElementById('#hidden-date-' + this.uid);

		// focus on editable editable
		this.editable.focus();

		var dateObject = undefined;
		dateInput.datepicker({
			dateFormat: 'dd. mm. yy',
			onSelect: function onSelect(dateText, inst) {
				dateObject = $(this).datepicker('getDate');
				var d = new Date();

				var millisecondsPerDay = 1000 * 60 * 60 * 24;

				var millisBetween = dateObject.getTime() - d.getTime();
				var days = millisBetween / millisecondsPerDay;

				var diff = Math.floor(days);

				daysLeft.html('<span>' + diff + '</span>days left');
				date.innerHTML = dateText;
			}
		}).datepicker('setDate', this.date);

		var observer = new MutationObserver(function (mutationList) {
			mutationList.forEach(function (mutation) {
				if (mutation.type == 'childList') {
					_this.date = mutation.target.innerText;
					_this.diff = daysLeft.find('span').html();
					app.setObject('counters', _this); // update globally
				}
			});
		});
		observer.observe(date, { attributes: true, childList: true, subtree: true });

		// handle end of input
		this.editable.on('input', function (e) {
			_this.title = $(e.currentTarget).text(); // set new text
			app.setObject('counters', _this); // update globally
		});

		// handle removing
		this.removeBtn.on('click', function (e) {
			_this.element.remove(); // remove from HTML
			app.removeObject('counters', _this); // remove globally
		});
	};

	Counter.prototype.test = function test() {
		console.log(this);
	};

	return Counter;
})();

exports['default'] = Counter;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var cform = $('form');

var init = function init() {
	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function (event) {
		// Stop the browser from submitting the form.
		event.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		}).done(function (response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
		}).fail(function (data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});
	});
};

exports['default'] = init;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
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
		this.editable = c;
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
		this.editable = this.element.find('.content');
		this.removeBtn = this.element.find('i');

		// focus on editable editable
		this.editable.focus();

		// handle end of input
		this.editable.on('input', function (e) {
			_this.text = $(e.currentTarget).text(); // set new text
			app.setObject('notes', _this); // update globally
		});

		// handle removing
		this.removeBtn.on('click', function (e) {
			_this.element.remove(); // remove from HTML
			app.removeObject('notes', _this); // remove globally
		});
	};

	return Note;
})();

exports['default'] = Note;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var svg = $('.logo > svg');

var init = function init() {

	svg.on('mouseover', function (e) {

		var txt = svg.find('text');
		txt.attr('fill', '#f8bbd0');
		txt.attr('transform', 'translate(0 220)');
	});

	svg.on('mouseout', function (e) {
		var txt = svg.find('text');
		txt.attr('fill', '#fff');
		txt.attr('transform', 'translate(0 282)');
	});
};

exports['default'] = init;
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var init = function init() {
	showTime();
	setInterval(showTime, 60000);
};

var showTime = function showTime() {
	var d = new Date();
	$('.clock').text(addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
};

var addZero = function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
};

exports["default"] = init;
module.exports = exports["default"];

},{}]},{},[1]);
