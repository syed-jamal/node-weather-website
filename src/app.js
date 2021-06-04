const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Syed Jamal'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful text.",
        title: 'Help',
        name: 'Syed Jamal'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location: data.location
            });
        });
    });

});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Syed Jamal'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Syed Jamal',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Syed Jamal',
        errorMessage: 'Page not found'

    });
});

app.listen(3000, () => {
    console.log("server up and running on port 3000");
});