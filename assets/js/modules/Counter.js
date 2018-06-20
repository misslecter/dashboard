export default class Counter {

	constructor(uid, t = '', date = null, diff = '-') {
		this.uid = uid;
		this.title = t;
		this.date = date;
		this.diff = diff;
	}

	render() {
		let element = $(`<div id="counter-` + this.uid + `" class="module counter" draggable="true"></div>`);
		let wrapper = $(`<div class="wrapper"></div>`);
		let title = $(`<div class="title" contenteditable="true">` + this.title + `</div>`);
		let dateInput = $(`<input type="text" class="datepicker" placeholder="Select date...">`);
		let days = $(`<div class="days-left"><span>` + this.diff + `</span>days left</div>`);
		let hidden = $(`<div class="hidden" id="#hidden-date-` + this.uid + `">` + this.date + `</div>`);

		let i = $(`<i class="fa fa-times-circle fa-lg"></i>`);

		wrapper.append(title);
		wrapper.append(dateInput);
		wrapper.append(days);
		wrapper.append(hidden);

		element.append(wrapper);
		element.append(i);

		return element;
	}

	handleUpdates(dashboard) {

		// set elements
		let element = $('#counter-' + this.uid);
		let editable = element.find('.title');
		let removeBtn = element.find('i');
		let dateInput = element.find('.datepicker');
		let daysLeft = element.find('.days-left');
		let date = document.getElementById('#hidden-date-' + this.uid);

		// focus on editable editable
		editable.focus();

		dateInput.datepicker({
			dateFormat: 'dd. mm. yy',
			onSelect: function(dateText) {
				let dateObject = $(this).datepicker('getDate');
				let d = new Date();

				let millisecondsPerDay = 1000 * 60 * 60 * 24;

				let millisBetween = dateObject.getTime() - d.getTime();
				let days = millisBetween / millisecondsPerDay;

				let diff = Math.floor(days) + 1;

				daysLeft.html('<span>' + diff + '</span>days left');
				date.innerHTML = dateText;
			}
		}).datepicker('setDate', this.date);


		let observer = new MutationObserver((mutationList) => {
			mutationList.forEach((mutation) => {
				if(mutation.type == 'childList') {
					this.date = mutation.target.innerText;
					this.diff = daysLeft.find('span').html();
					dashboard.setObject('counters', this); // update globally
				}
			});
		});
		observer.observe(date, { attributes: true, childList: true, subtree: true });

		// handle end of input
		editable.on('input', (e) => {
			this.title = $(e.currentTarget).text(); // set new text
			dashboard.setObject('counters', this); // update globally
		});

		// handle removing
		removeBtn.on('click', (e) => {
			element.remove(); // remove from HTML
			dashboard.removeObject('counters', this); // remove globally
		})
	}
}