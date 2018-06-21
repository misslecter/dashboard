const API_KEY = 'b8cd48c5c58d650c4f0f1e1c1ed69df1',
	GROUP_ID = '23854677@N00';

const mainDashboard = $('main');

let imgSrc, owner, ownername;

const init = () => {
	let savedBgFlickr = localStorage.getItem('background-flickr');
	if(savedBgFlickr == null) {
		getData();
	} else {
		let bg = JSON.parse(savedBgFlickr);
		let fi = new FlickrImage(bg.url, bg.owner, bg.ownername);
		fi.setBackground();
	}

	$('#refreshBg').on('click', (e) => {

		console.log('click');
		e.preventDefault();
		e.stopPropagation();
		getData();
	});
};

export default init;

const getData = () => {

	$.getJSON(
		"http://api.flickr.com/services/rest/",
		{
			method: 'flickr.people.getPublicPhotos',
			api_key: API_KEY,
			user_id: '152977080@N03', // momentum
			format: 'json',
			nojsoncallback: 1,
			extras: "description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o",
			per_page: 100
		},

		function (data) {

			// if everything went good
			if (data.stat == 'ok') {

				console.log("First JSON is fine, we are loading second JSON (you can get all data from here anyway)");

				// get a random id from the array
				let photo = data.photos.photo[Math.floor(Math.random() * data.photos.photo.length)];
				owner = photo.owner;
				ownername = photo.ownername;

				// mainDashboard.css({'background': 'url(' + photo.url_l + ')'});

				// console.log(photo);

				// now call the flickr API and get the picture with a nice size
				$.getJSON(
					"http://api.flickr.com/services/rest/",
					{
						method: 'flickr.photos.getSizes',
						api_key: API_KEY,
						photo_id: photo.id,
						format: 'json',
						nojsoncallback: 1
					},
					function (response) {
						if (response.stat == 'ok') {
							console.log("Second JSON is fine");

							let allSizes = response.sizes.size;
							imgSrc = allSizes[allSizes.length - 1].source;

							let flickrImg = new FlickrImage(imgSrc, photo.owner, photo.ownername);
							localStorage.setItem('background-flickr', JSON.stringify(flickrImg));

							flickrImg.setBackground();
						}
						else {
							console.log(" The request to get the picture was not good ");
						}
					}
				);

			}
			else {
				console.log(" The request to get the array was not good :( ");
			}
		}
	);
};

class FlickrImage {
	constructor(url = null, owner = null, ownername = null) {
		this.url = url;
		this.owner = owner;
		this.ownername = ownername;
	}

	setBackground() {
		mainDashboard.css({'background': 'url(' + this.url + ')'});
		$('.background-copyright').remove();
		mainDashboard.append('<div class="background-copyright"><p>Photo by <a href="https://www.flickr.com/people/'+ this.owner + '" target="_blank">' + this.ownername + '</a></p></div>')
	}
}
