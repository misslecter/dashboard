(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _appSvg = require("./app/svg");

var _appSvg2 = _interopRequireDefault(_appSvg);

var _appForm = require("./app/form");

var _appForm2 = _interopRequireDefault(_appForm);

var _appTime = require("./app/time");

var _appTime2 = _interopRequireDefault(_appTime);

var _appFlickr = require("./app/flickr");

var _appFlickr2 = _interopRequireDefault(_appFlickr);

var _modulesDashboard = require("./modules/Dashboard");

var _modulesDashboard2 = _interopRequireDefault(_modulesDashboard);

var menuBtn = $('header button'),
    plusBtn = $('.add-new button'),
    addNewBtns = $('.add-new__choice a'),
    link = $('header .link a'),
    main = $('main'),
    fileInput = $('#file-selector'),
    refreshLink = $('#refreshBg'),
    b = $('body');

$(document).ready(function () {

	updateAppBackground();

	$('#app-theme-selector + label').click(function (e) {
		if ($('#app-theme-selector').is(':checked')) {
			// switch to light
			localStorage.setItem('app-theme', 'app-theme-light');
			b.removeClass('app-theme-dark').addClass('app-theme-light');
		} else {
			localStorage.setItem('app-theme', 'app-theme-dark');
			b.removeClass('app-theme-light').addClass('app-theme-dark');
		}
	});

	$('.app-background-change').click(function (e) {
		var selectedTheme = $(e.currentTarget).attr('for');
		localStorage.setItem('app-background', selectedTheme);

		fileInput.prop('disabled', !(selectedTheme == 'app-background-custom'));
		refreshLink.toggleClass('disabled', !(selectedTheme == 'app-background-flickr'));

		updateAppBackground();
	});

	fileInput.on('change', function (event) {
		var img = event.target.files[0];
		console.log(img);

		// Only process image files.
		if (!img.type.match('image.*')) return;

		var reader = new FileReader();
		reader.onload = (function (theFile) {
			return function (e) {
				localStorage.setItem('background-custom', e.target.result);
				updateAppBackground();
			};
		})(img);

		// Read in the image file as a data URL.
		reader.readAsDataURL(img);
	});

	$(".open-settings-menu").click(function (e) {
		e.preventDefault();
		$(e.currentTarget).toggleClass('menu-opened');
		$(".settings-menu").toggle();
	});

	var dashboard = new _modulesDashboard2["default"]();

	// set visible
	if (localStorage.getItem('welcomeClosed') == 1) {
		location.hash = location.hash == '' ? '#dashboard' : location.hash;

		// Load data from LS
		dashboard.loadData();
	} else {
		location.hash = '#welcome';
	}

	$('#welcome a').on('click', function (e) {
		localStorage.clear();
		localStorage.setItem('welcomeClosed', 1);

		if (localStorage.getItem('sampleLoaded') != 1 && $(e.currentTarget).hasClass('sample')) {
			dashboard.loadSampleData();
		}
	});

	// Open navigation
	menuBtn.click(function (e) {
		return dashboard.handleNavBtnClick(e.currentTarget);
	});

	// Show add new menu
	plusBtn.click(function (e) {
		return dashboard.handlePlusBtnClick(e.currentTarget);
	});

	// Handle adding new stuff
	addNewBtns.map(function (index, el) {
		return $(el).click(function (e) {
			e.preventDefault();
			dashboard.handleAddNewBtnClick(e.currentTarget);
		});
	});

	_appSvg2["default"]();
	_appForm2["default"]();
	_appTime2["default"]();
});

var updateAppBackground = function updateAppBackground() {

	var appBg = localStorage.getItem('app-background'),
	    appTheme = localStorage.getItem('app-theme');

	if (appBg == null) appBg = 'app-background-default';
	if (appTheme == null) appTheme = 'app-theme-light';

	if (appBg == 'app-background-flickr') {
		_appFlickr2["default"]();
	} else if (appBg == 'app-background-default') {
		main.removeAttr('style');
	} else if (appBg == 'app-background-custom') {

		var img = localStorage.getItem('background-custom');
		if (img == null) return;

		main.css({ 'background': 'url(' + img + ')' });
		fileInput.prop('disabled', false);
	}

	b.removeAttr("class");
	b.addClass(appBg);
	b.addClass(appTheme);
	$('#' + appBg).prop("checked", true);
	$('#app-theme-selector').prop("checked", appTheme == 'app-theme-dark');
};

},{"./app/flickr":2,"./app/form":3,"./app/svg":4,"./app/time":5,"./modules/Dashboard":7}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var API_KEY = 'b8cd48c5c58d650c4f0f1e1c1ed69df1',
    GROUP_ID = '23854677@N00';

var mainDashboard = $('main');

var imgSrc = undefined,
    owner = undefined,
    ownername = undefined;

var init = function init() {
	var savedBgFlickr = localStorage.getItem('background-flickr');
	if (savedBgFlickr == null) {
		getData();
	} else {
		var bg = JSON.parse(savedBgFlickr);
		var fi = new FlickrImage(bg.url, bg.owner, bg.ownername);
		fi.setBackground();
	}

	$('#refreshBg').on('click', function (e) {

		console.log('click');
		e.preventDefault();
		e.stopPropagation();
		getData();
	});
};

exports['default'] = init;

var getData = function getData() {

	$.getJSON("http://api.flickr.com/services/rest/", {
		method: 'flickr.people.getPublicPhotos',
		api_key: API_KEY,
		user_id: '152977080@N03', // momentum
		format: 'json',
		nojsoncallback: 1,
		extras: "description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o",
		per_page: 100
	}, function (data) {

		// if everything went good
		if (data.stat == 'ok') {
			(function () {

				console.log("First JSON is fine, we are loading second JSON (you can get all data from here anyway)");

				// get a random id from the array
				var photo = data.photos.photo[Math.floor(Math.random() * data.photos.photo.length)];
				owner = photo.owner;
				ownername = photo.ownername;

				// mainDashboard.css({'background': 'url(' + photo.url_l + ')'});

				// console.log(photo);

				// now call the flickr API and get the picture with a nice size
				$.getJSON("http://api.flickr.com/services/rest/", {
					method: 'flickr.photos.getSizes',
					api_key: API_KEY,
					photo_id: photo.id,
					format: 'json',
					nojsoncallback: 1
				}, function (response) {
					if (response.stat == 'ok') {
						console.log("Second JSON is fine");

						var allSizes = response.sizes.size;
						imgSrc = allSizes[allSizes.length - 1].source;

						var flickrImg = new FlickrImage(imgSrc, photo.owner, photo.ownername);
						localStorage.setItem('background-flickr', JSON.stringify(flickrImg));

						flickrImg.setBackground();
					} else {
						console.log(" The request to get the picture was not good ");
					}
				});
			})();
		} else {
			console.log(" The request to get the array was not good :( ");
		}
	});
};

var FlickrImage = (function () {
	function FlickrImage() {
		var url = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
		var owner = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		var ownername = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

		_classCallCheck(this, FlickrImage);

		this.url = url;
		this.owner = owner;
		this.ownername = ownername;
	}

	FlickrImage.prototype.setBackground = function setBackground() {
		mainDashboard.css({ 'background': 'url(' + this.url + ')' });
		$('.background-copyright').remove();
		mainDashboard.append('<div class="background-copyright"><p>Photo by <a href="https://www.flickr.com/people/' + this.owner + '" target="_blank">' + this.ownername + '</a></p></div>');
	};

	return FlickrImage;
})();

module.exports = exports['default'];

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Counter = (function () {
	function Counter(uid) {
		var t = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
		var date = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
		var diff = arguments.length <= 3 || arguments[3] === undefined ? '-' : arguments[3];

		_classCallCheck(this, Counter);

		this.uid = uid;
		this.title = t;
		this.date = date;
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

	Counter.prototype.handleUpdates = function handleUpdates(dashboard) {
		var _this = this;

		// set elements
		var element = $('#counter-' + this.uid);
		var editable = element.find('.title');
		var removeBtn = element.find('i');
		var dateInput = element.find('.datepicker');
		var daysLeft = element.find('.days-left');
		var date = document.getElementById('#hidden-date-' + this.uid);

		// focus on editable editable
		editable.focus();

		dateInput.datepicker({
			dateFormat: 'dd. mm. yy',
			onSelect: function onSelect(dateText) {
				var dateObject = $(this).datepicker('getDate');
				var d = new Date();

				var millisecondsPerDay = 1000 * 60 * 60 * 24;

				var millisBetween = dateObject.getTime() - d.getTime();
				var days = millisBetween / millisecondsPerDay;

				var diff = Math.floor(days) + 1;

				daysLeft.html('<span>' + diff + '</span>days left');
				date.innerHTML = dateText;
			}
		}).datepicker('setDate', this.date);

		var observer = new MutationObserver(function (mutationList) {
			mutationList.forEach(function (mutation) {
				if (mutation.type == 'childList') {
					_this.date = mutation.target.innerText;
					_this.diff = daysLeft.find('span').html();
					dashboard.setObject('counters', _this); // update globally
				}
			});
		});
		observer.observe(date, { attributes: true, childList: true, subtree: true });

		// handle end of input
		editable.on('input', function (e) {
			_this.title = $(e.currentTarget).text(); // set new text
			dashboard.setObject('counters', _this); // update globally
		});

		// handle removing
		removeBtn.on('click', function (e) {
			element.remove(); // remove from HTML
			dashboard.removeObject('counters', _this); // remove globally
		});
	};

	return Counter;
})();

exports['default'] = Counter;
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Note = require("./Note");

var _Note2 = _interopRequireDefault(_Note);

var _Counter = require("./Counter");

var _Counter2 = _interopRequireDefault(_Counter);

var _Todo = require("./Todo");

var _Todo2 = _interopRequireDefault(_Todo);

var main = $('main'),
    nav = $('nav'),
    header = $('header'),
    addNewNav = $('.add-new__choice');

var Dashboard = (function () {
	function Dashboard() {
		_classCallCheck(this, Dashboard);

		this.notes = {};
		this.todos = {};
		this.counters = {};
	}

	Dashboard.prototype.handleNavBtnClick = function handleNavBtnClick(clickedElement) {
		$(clickedElement).toggleClass('nav-opened');
		header.toggleClass('nav-opened');
		nav.toggleClass('opened');

		var notesHolder = $('#nav-notes'),
		    todosHolder = $('#nav-todos'),
		    countersHolder = $('#nav-counters');

		if (Object.keys(this.notes).length > 0) {
			notesHolder.html('');
			$.each(this.notes, function (key, note) {
				notesHolder.append('<li><a href="">' + note.text.substr(0, 20) + '</a></li>');
			});
		}

		if (Object.keys(this.todos).length > 0) {
			todosHolder.html('');
			$.each(this.todos, function (key, todo) {
				todosHolder.append('<li><a href="">' + todo.title.substr(0, 20) + '</a></li>');
			});
		}

		if (Object.keys(this.counters).length > 0) {
			countersHolder.html('');
			$.each(this.counters, function (key, counter) {
				countersHolder.append('<li><a href="">' + counter.title.substr(0, 20) + '</a></li>');
			});
		}

		nav.find('a').on('click', function (e) {
			e.preventDefault();
			$(clickedElement).toggleClass('nav-opened');
			header.toggleClass('nav-opened');
			nav.toggleClass('opened');

			// todo: scroll
		});
	};

	Dashboard.prototype.handlePlusBtnClick = function handlePlusBtnClick(clickedElement) {
		$(clickedElement).toggleClass('active');
		addNewNav.fadeToggle().toggleClass('opened');
	};

	Dashboard.prototype.handleAddNewBtnClick = function handleAddNewBtnClick(clickedElement) {
		switch ($(clickedElement).data('target')) {
			case 'note':
				this.addNote();
				break;
			case 'counter':
				this.addCounter();
				break;
			case 'todo':
				this.addTodo();
				break;
			default:
				return;
		}
	};

	// NOTES //

	Dashboard.prototype.addNote = function addNote() {
		var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

		var note = undefined;

		if (data != null) {
			note = new _Note2["default"](data.uid, data.text);
		} else {
			note = new _Note2["default"](this.generateId());
		}

		// set to global object
		this.setObject('notes', note);

		// update html
		this.updateHtml(note);

		note.handleUpdates(this);
	};

	Dashboard.prototype.setObject = function setObject(what, e) {
		switch (what) {
			case 'notes':
				this.notes[e.uid] = e;
				localStorage.setItem(what, JSON.stringify(this.notes));
				break;
			case 'counters':
				this.counters[e.uid] = e;
				localStorage.setItem(what, JSON.stringify(this.counters));
				break;
			case 'todos':
				this.todos[e.uid] = e;
				localStorage.setItem(what, JSON.stringify(this.todos));
				break;
			default:
				return;
		}
	};

	Dashboard.prototype.removeObject = function removeObject(what, e) {
		switch (what) {
			case 'notes':
				delete this.notes[e.uid];
				localStorage.setItem(what, JSON.stringify(this.notes));
				break;
			case 'counters':
				delete this.counters[e.uid];
				localStorage.setItem(what, JSON.stringify(this.counters));
				break;
			case 'todos':
				delete this.todos[e.uid];
				localStorage.setItem(what, JSON.stringify(this.todos));
				break;
			default:
				return;
		}
		// this.updateStorage(what);
	};

	// COUNTER //

	Dashboard.prototype.addCounter = function addCounter() {
		var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

		var counter = undefined;

		if (data != null) {
			counter = new _Counter2["default"](data.uid, data.title, data.date, data.diff);
		} else {
			counter = new _Counter2["default"](this.generateId());
		}

		// set to global object
		this.setObject('counters', counter);

		// update html
		this.updateHtml(counter);

		counter.handleUpdates(this);
	};

	Dashboard.prototype.addTodo = function addTodo() {
		var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

		var todo = undefined;

		if (data != null) {
			todo = new _Todo2["default"](data.uid, data.title, data.items);
		} else {
			todo = new _Todo2["default"](this.generateId());
		}

		// set to global object
		this.setObject('todos', todo);

		// update html
		this.updateHtml(todo);

		todo.handleUpdates(this);
	};

	Dashboard.prototype.loadData = function loadData() {
		var _this = this;

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
		var todos = localStorage.getItem('todos');
		if (todos) {
			this.todos = JSON.parse(todos);
			$.each(this.todos, function (key, value) {
				return _this.addTodo(value);
			});
		}
	};

	Dashboard.prototype.updateHtml = function updateHtml(el) {
		main.append(el.render());
	};

	Dashboard.prototype.generateId = function generateId() {
		return Math.floor(1000 + Math.random() * 9000);
	};

	Dashboard.prototype.loadSampleData = function loadSampleData() {

		this.addNote({ "uid": this.generateId(), "text": "Tact is the art of making a point without making an enemy." });
		this.addNote({ "uid": this.generateId(), "text": "What animal represents Scotland?<br>The unicorn is the national animal of Scotland. The Royal Coat of Arms of Scotland, used prior to 1603 by the Kings of Scotland was supported by two unicorns and the current royal coat of arms of the United Kingdom is supported by a unicorn for Scotland along with a lion for England." });

		var dateObject = new Date(2018, 5, 21);
		var d = new Date();
		var diff = Math.floor((dateObject.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)) + 1;
		this.addCounter({ "uid": this.generateId(), "title": "Aerodrome Festival", "date": "21. 06. 2018", "diff": diff });

		this.addTodo({ "uid": 6686, "title": "Summer plans", "items": [{ "text": "move to new apartment", "checked": false, "id": "6686-0" }, { "text": "go for holiday", "checked": false, "id": "6686-1" }, { "text": "be awesome!", "checked": true, "id": "6686-2" }] });

		this.addTodo({ "uid": 2506, "title": "New clothes", "items": [{ "text": "shorts", "checked": false, "id": "2506-0" }, { "text": "skirts", "checked": false, "id": "2506-1" }, { "text": "shoes", "checked": false, "id": "2506-2" }] });

		localStorage.setItem('sampleLoaded', 1);
	};

	return Dashboard;
})();

exports["default"] = Dashboard;
module.exports = exports["default"];

},{"./Counter":6,"./Note":8,"./Todo":9}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Note = (function () {
	function Note(uid) {
		var t = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

		_classCallCheck(this, Note);

		this.uid = uid;
		this.text = t;
	}

	Note.prototype.render = function render() {
		var element = $('<div id="note-' + this.uid + '" class="module note" draggable="true"></div>');
		var content = $('<div class="content" contenteditable="true">' + this.text + '</div>');
		var i = $('<i class="fa fa-times-circle fa-lg"></i>');

		element.append(content);
		element.append(i);

		return element;
	};

	Note.prototype.handleUpdates = function handleUpdates(dashboard) {
		var _this = this;

		// set elements
		var element = $('#note-' + this.uid);
		var editable = element.find('.content');
		var removeBtn = element.find('i');

		// focus on editable editable
		editable.focus();

		// handle end of input
		editable.on('input', function (e) {
			_this.text = $(e.currentTarget).text(); // set new text
			dashboard.setObject('notes', _this); // update globally
		});

		// handle removing
		removeBtn.on('click', function (e) {
			element.remove(); // remove from HTML
			dashboard.removeObject('notes', _this); // remove globally
		});
	};

	return Note;
})();

exports['default'] = Note;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Todo = (function () {
	function Todo(uid) {
		var t = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
		var items = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

		_classCallCheck(this, Todo);

		this.uid = uid;
		this.title = t;
		this.items = [];

		this.parseItems(items);
	}

	Todo.prototype.parseItems = function parseItems(items) {
		var _this = this;

		$.each(items, function (key, value) {
			var i = new TodoItem(value.text, value.checked, value.id);
			_this.items.push(i);
		});
	};

	Todo.prototype.render = function render() {
		var _this2 = this;

		var element = $('<div id="todo-' + this.uid + '" class="module todo" draggable="true"></div>');
		var wrapper = $('<div class="wrapper"></div>');
		var title = $('<h1 class="title" contenteditable="true">' + this.title + '</h1>');
		var items = $('<ul class="items"></ul>');

		this.items.forEach(function (i) {
			return items.append(_this2.renderItem(i));
		});

		var form = $('<form class="todo-new"><input type="text" name="new-todo" placeholder="New todo..."></form>');
		var i = $('<i class="fa fa-times-circle fa-lg"></i>');

		wrapper.append(title);
		wrapper.append(items);
		wrapper.append(form);

		element.append(wrapper);
		element.append(i);

		return element;
	};

	Todo.prototype.handleUpdates = function handleUpdates(dashboard) {
		var _this3 = this;

		// set elements
		var element = $('#todo-' + this.uid);
		var editable = element.find('.title');
		var removeBtn = element.find('i');
		var form = element.find('form');

		// focus on editable editable
		editable.focus();

		// handle end of input
		editable.on('input', function (e) {
			_this3.title = $(e.currentTarget).text(); // set new text
			dashboard.setObject('todos', _this3); // update globally
		});

		// handle removing
		removeBtn.on('click', function (e) {
			element.remove(); // remove from HTML
			dashboard.removeObject('todos', _this3); // remove globally
		});

		// handle adding new todoItem
		form.on('submit', function (e) {
			e.preventDefault();
			var input = form.find("input");
			var todoText = input.val();
			input.val('');
			_this3.addItem(dashboard, todoText);
			dashboard.setObject('todos', _this3); // update globally
		});

		this.items.forEach(function (i) {
			// handle checking items
			$("#item" + i.id).on('click', function (e) {
				_this3.updateCheckedState(i, dashboard);
			});

			// handle removing items
			$("#item" + i.id + " ~ span").on('click', function (e) {

				// remove from list
				_this3.items = $.grep(_this3.items, function (e) {
					return e.id != i.id;
				});

				dashboard.setObject('todos', _this3); // update globally

				// remove from HTML
				$(e.target.parentElement).remove();
			});
		});
	};

	Todo.prototype.updateCheckedState = function updateCheckedState(i, app) {
		i.checked = !i.checked;
		console.log(this.items);
		app.setObject('todos', this); // update globally
	};

	Todo.prototype.addItem = function addItem(app, text) {
		var _this4 = this;

		var item = new TodoItem(text, false, this.uid + "-" + this.items.length);
		this.items.push(item);

		var ul = $('#todo-' + this.uid).find('ul.items');
		ul.append(this.renderItem(item));

		app.setObject('todos', this); // update globally

		// set listener
		$("#item" + item.id).on('click', function (e) {
			_this4.updateCheckedState(item, app);
		});

		console.log(this.items);
	};

	Todo.prototype.renderItem = function renderItem(item) {
		var checked = item.checked ? "checked" : "";
		return $('<li><input id="item' + item.id + '" type="checkbox"' + checked + '>\n                        <label for="item' + item.id + '">' + item.text + '</label>\n                        <span class="fa fa-times fa-md"></span></li>');
	};

	return Todo;
})();

exports['default'] = Todo;

var TodoItem = function TodoItem() {
	var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	var checked = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	var id = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	_classCallCheck(this, TodoItem);

	this.text = text;
	this.checked = checked;
	this.id = id;
};

module.exports = exports['default'];

},{}]},{},[1]);
