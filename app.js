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
    const countryURL = {
        url: 'https://covid-193.p.rapidapi.com/statistics',
        headers: {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
	        "x-rapidapi-key": "942dc0b96amsh67348984a504c37p1b0743jsne53b8b41b9a9"       
        }
    }
    const globalURL = {
        url: 'https://covid-193.p.rapidapi.com/statistics?country=all',
        headers: {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
	        "x-rapidapi-key": "942dc0b96amsh67348984a504c37p1b0743jsne53b8b41b9a9"       
        }
    }
    const historyURL = {
        url: 'https://covid-193.p.rapidapi.com/history?country=all',
        headers: {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
	        "x-rapidapi-key": "942dc0b96amsh67348984a504c37p1b0743jsne53b8b41b9a9"       
        }
    }
    const result = [];
    getCountryData = (error, response, body) => {   
        if(!error && response.statusCode === 200) {
            let countryData = JSON.parse(body);
            result.push({
                countries: countryData
            });
        }

        request(globalURL, getGlobalData);
    };
    getGlobalData = (error, response, body) => {   
        if(!error && response.statusCode === 200) {
            let globalData = JSON.parse(body);
            result.push({
                global: globalData
            });
        }

        request(historyURL, getHistoryData);
    };
    getHistoryData = (error, response, body) => {   
        if(!error && response.statusCode === 200) {
            let historyData = JSON.parse(body);
            result.push({
                history: historyData
            });
        }

        request(countrySearchURL, getSearchData);
    };
    let query = (req.query.search) || 'usa';
    const countrySearchURL = {
        url: `https://covid-193.p.rapidapi.com/statistics?country=${query}`,
        headers: {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
	        "x-rapidapi-key": "942dc0b96amsh67348984a504c37p1b0743jsne53b8b41b9a9"       
        }
    };
    getSearchData = (error, response, body) => {   
        if(!error && response.statusCode === 200) {
            let searchData = JSON.parse(body);
            result.push({
                searched: searchData
            });
        }
        res.render('dashboard', {
            countries: result[0].countries,
            global: result[1].global,
            history: result[2].history,
            search: result[3].searched
        });
    };
    // make a call to the API and render the dashboard page with its data
    request(countryURL, getCountryData);
});

// Country Search Route
// app.get('/countries', (req, res) => {
//     let query = (req.query.search);
//     const countrySearchURL = {
//         url: `https://covid-193.p.rapidapi.com/countries?search=${query}`,
//         headers: {
//             "x-rapidapi-host": "covid-193.p.rapidapi.com",
// 	        "x-rapidapi-key": "942dc0b96amsh67348984a504c37p1b0743jsne53b8b41b9a9"       
//         }
//     };
//     getSearchData = (error, response, body) => {   
//         if(!error && response.statusCode === 200) {
//             let searchData = JSON.parse(body);
//             res.send({search: searchData});
//         }
//     };
//     request(countrySearchURL, getSearchedData);
// });


//enable listening for server
app.listen(process.env.PORT || 4000, process.env.IP, (req, res) => {
    console.log('Server listening');
});