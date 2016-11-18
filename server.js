'use strict';

const express = require('express');

let app = express();
let PORT = process.env.PORT || 5000;

let MonthNumber = (monthName) => {
    let monthNameStr = monthName.substr(0, 3).toLowerCase();
    const actions = {
        "dec": () => { return 12 },
        "nov": () => { return 11 },
        "oct": () => { return 10 },
        "sep": () => { return 9 },
        "aug": () => { return 8 },
        "jul": () => { return 7 },
        "jun": () => { return 6 },
        "may": () => { return 5 },
        "apr": () => { return 4 },
        "mar": () => { return 3 },
        "feb": () => { return 2 },
        "jan": () => { return 1 },
    }
    if (monthName && Object.keys(actions).indexOf(monthNameStr) != -1) {
        return actions[monthNameStr]();
    } else {
        return false;
    }
}
app.listen(PORT, () => {
    process.stdout.write("Server Started on http://localhost:" + PORT + "\n");
});
const template = () => {
    return (`
    <html>
    <head>
    <title>Time Stamp Microservice Project</title>
    <style>
        .example p {color: red; background: #ffcdd2; margin: 10px; padding: 10px;}
    </style>    
    </head>
    <body>
    <h1>Welcome to Time Stamp Microservice API</h1>
    <h2>Usage Instructions</h2>
    <p>
        <ol>
            <li class="example">Normal Time Example<br><p>https://fcc-timestamp-ns.herokuapp.com/Decemeber%2015,%202015</p></li> 
            <li class="example">Unix Time Example<br><p>https://fcc-timestamp-ns.herokuapp.com/1450117800</p></li>
        </ol>
    </p>
    <footer>Created By <a href="https://github.com/ishanjain28">Ishan Jain</a> for <a href="https://www.freecodecamp.com/challenges/timestamp-microservice">this</a> project on <a href="https://freecodecamp.com">Freecodecamp.com</a></footer>
    
    </body>
    </html>
    `);
}
app.get('/', (req, res) => {
    res.send(template());
});

app.get('/:time', (req, res) => {
    let time = req.params['time'];
    if (parseInt(time).toString().length == 10) {
        let date = new Date(parseInt(time) * 1000);
        let formatDate = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(date);

        res.send({
            "unix": parseInt(time),
            "natural": formatDate
        });

    } else if (checkProperNormalDate(time)) {
        let timeArray = time.replace(',', '').split(" ");
        let unixTime = Date.parse(new Date(timeArray[2] + "." + MonthNumber(timeArray[0]) + "." + timeArray[1])) / 1000;
        res.send({
            "unix": unixTime,
            "natural": time
        });
    } else {
        res.send("Please Enter a valid date");
    }
});

function checkProperNormalDate(time) {
    let timesplit = time.replace(',', '').split(" ");
    return timesplit.indexOf('') == -1 && timesplit[1] <= 31 && timesplit[2].toString().length == 4 && MonthNumber(timesplit[0]);
}