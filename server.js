'use strict';

const express = require('express');

let app = express();
let PORT = process.env.PORT || 5000;

let MonthName = (monthNumber) => {
    const actions = {
        1: () => { return "January"; },
        2: () => { return "February"; },
        3: () => { return "March"; },
        4: () => { return "April"; },
        5: () => { return "May"; },
        6: () => { return "June"; },
        7: () => { return "July"; },
        8: () => { return "August"; },
        9: () => { return "September"; },
        10: () => { return "October"; },
        11: () => { return "November"; },
        12: () => { return "December"; }
    }
    return actions[monthNumber]();
}
let MonthNumber = (monthName) => {
    if (monthName.indexOf('Dec') || monthName.indexOf('dec')) {
        return 12;
    }
    if (monthName.indexOf('Nov') || monthName.indexOf('nov')) {
        return 11;
    }
    if (monthName.indexOf('Oct') || monthName.indexOf('oct')) {
        return 10;
    }
    if (monthName.indexOf('Sept') || monthName.indexOf('sept')) {
        return 9;
    }
    if (monthName.indexOf('Aug') || monthName.indexOf('aug')) {
        return 8;
    }
    if (monthName.indexOf('July') || monthName.indexOf('july')) {
        return 7;
    }
    if (monthName.indexOf('June') || monthName.indexOf('june')) {
        return 6;
    }
    if (monthName.indexOf('May') || monthName.indexOf('may')) {
        return 5;
    }
    if (monthName.indexOf('April') || monthName.indexOf('april')) {
        return 4;
    }
    if (monthName.indexOf('March') || monthName.indexOf('march')) {
        return 3;
    }
    if (monthName.indexOf('Feb') || monthName.indexOf('feb')) {
        return 2;
    }
    if (monthName.indexOf('Jan') || monthName.indexOf('jan')) {
        return 1;
    }
}
app.listen(PORT, () => {
    console.log("Server Started on http://localhost:" + PORT);
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
app.get('/', (req, res, next) => {
    res.send(template());
});

app.get('/:time', (req, res, next) => {
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

    } else if (time.replace(",", "").split(" ").length == 3) {
        let timeArray = time.replace(',', '').split(" ");
        let unixTime = Date.parse(new Date(timeArray[2] + "." + MonthNumber(time[0]) + "." + timeArray[1])) / 1000;
        res.send({
            "unix": unixTime,
            "natural": time
        });
    } else {
        res.send("Please Enter a valid date");
    }
});

