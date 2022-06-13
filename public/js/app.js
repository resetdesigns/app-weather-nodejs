const weatherForm = document.querySelector('form#weather-form');
const search = document.querySelector('form#weather-form input');
const btnGeo = document.querySelector('#btn-geo');
const messageOne = document.querySelector('p#message-1');
const messageTwo = document.querySelector('p#message-2');

btnGeo.addEventListener('click', (e) => {
	e.preventDefault();

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			const posLat = position.coords.latitude;
			const posLon = position.coords.longitude;

			messageOne.textContent = 'Loading...';
			messageTwo.textContent = '';

			fetch('/geo-weather?lat=' + posLat + '&lon=' + posLon).then((response) => {
				response.json().then((data) => {
					if (data.error) {
						messageOne.textContent = data.error;
					} else {
						messageOne.textContent = data.location;
						messageTwo.textContent = data.forecast;
					}
				});
			});
		});
	}
});

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
		});
	});
});
