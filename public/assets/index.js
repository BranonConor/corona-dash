// Declare container for data from our API Call
const historicalDays = []
const historicalCases = []
fetch("https://covid-193.p.rapidapi.com/history?country=all", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "942dc0b96amsh67348984a504c37p1b0743jsne53b8b41b9a9"
    }
})
.then(response => response.json())
.then(data => {
    // Loop through data items and print unique dates with their number of cases into their arrays
    data.response.forEach(res => {
        if (!historicalDays.includes(res.day)) {
            historicalDays.push(res.day);
            historicalCases.push(res.cases.total);
        }
    });
    // draw our chart with Chart.js and render data from arrays
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: historicalDays.reverse(),
            datasets: [{
                label: 'Global Confirmed Cases',
                data: historicalCases.reverse(),
                backgroundColor: 'rgba(129, 176, 238, 0.3)',
                borderColor: 'rgba(142, 31, 51, 0.6)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
})
.catch(err => {
	console.log(err);
});
