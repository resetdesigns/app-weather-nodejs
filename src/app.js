const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Joseph Villajin',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Joseph Villajin',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Joseph Villajin',
		helpText: 'This is an example message',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address.',
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error: error });
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
			});
		});
	});
});

app.get('/geo-weather', (req, res) => {
	console.log(req);
	if (!req.query.lat && !req.query.lon) {
		return res.send({
			error: 'You must provide an address.',
		});
	}

	forecast(req.query.lat, req.query.lon, (error, forecastData) => {
		if (error) {
			return res.send({ error: error });
		}

		res.send({
			forecast: forecastData,
			lat: req.query.lat,
			lat: req.query.lon,
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Joseph Villajin',
		errorMessage: 'Help article not found.',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Joseph Villajin',
		errorMessage: 'Page not found.',
	});
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
