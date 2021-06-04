const request = require('postman-request');

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
//     }
// })
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d1fd670441811b7eeca21e26078057ed&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, "It is currently "+response.body.current.temperature+" degrees celcius. Feels like "+response.body.current.feelslike+" degrees celcius.");
        }
    });
};

module.exports = forecast;