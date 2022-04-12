require('../weather-app/node_modules/dotenv/lib/main').config();
const http = require('http');
const url = `http://api.weatherstack.com/current?access_key=dcd25e4a3bf2510fb73b2c2aa4f49141&query=California&units=f`;

const request = http.get(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error', (error) => {
    console.log(error);
});

request.end();

// Using an npm package helps to reduce the manual code that needs to be written
