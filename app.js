//initialize express
const express = require('express');
const app = express();
const request = require('request');
const path = require('path');

//initialize EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
// ----------- ROUTES ------------- //
// ROOT ROUTE
app.get('/', (req, res) => {
    // store API request info in a variable to be conveniently called
    const options = {
        url: 'https://covid-193.p.rapidapi.com/statistics',
        headers: {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
	        "x-rapidapi-key": "942dc0b96amsh67348984a504c37p1b0743jsne53b8b41b9a9"       
        }
    }
    // make a call to the API and render the dashboard page with its data
    request(options, (error, response, body) => {   
        let data = JSON.parse(body);
        res.render('dashboard', {data: data});
    });
});

//enable listening for server
app.listen(process.env.PORT, process.env.IP, (req, res) => {
    console.log('Server listening');
});