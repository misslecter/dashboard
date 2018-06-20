const svg = $('.logo > svg');

const init = () => {

	svg.on('mouseover', (e) => {

		let txt = svg.find('text');
		txt.attr('fill', '#f8bbd0');
		txt.attr('transform', 'translate(0 220)');
	});

	svg.on('mouseout', (e) => {
		let txt = svg.find('text');
		txt.attr('fill', '#fff');
		txt.attr('transform', 'translate(0 282)');
	});

};

export default init;