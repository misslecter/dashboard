const init = () => {
	showTime();
	setInterval(showTime, 60000);
};

const showTime = () => {
	let d = new Date();
	$('.clock').text(addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
};

const addZero = (i) => {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
};

export default init;