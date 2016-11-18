'use strict';

const http = require('http');

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
const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.end(template());
    } else if (req.url) {
        let time = req.url.substr(1);
        if (parseInt(time).toString().length == 10) {
            let date = new Date(parseInt(time) * 1000);
            let formatDate = new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }).format(date);
            res.end(JSON.stringify({
                "unix": parseInt(time),
                "natural": formatDate
            }));

        } else if (checkProperNormalDate(time)) {
            let timeArray = time.split("%20").join(" ").replace(',', '').split(" ");
            let unixTime = Date.parse(new Date(timeArray[2] + "." + MonthNumber(timeArray[0]) + "." + timeArray[1])) / 1000;
            res.end(JSON.stringify({
                "unix": unixTime,
                "natural": time.split("%20").join(" ")
            }));
        } else {
            res.end("Please Enter a valid date");
        }
    }
});

function checkProperNormalDate(time) {
    let timesplit = time.split("%20").join(" ").replace(',', '').split(" ");
    return timesplit.indexOf('') == -1 && timesplit[1] <= 31 && timesplit[2].toString().length == 4 && MonthNumber(timesplit[0]);
}

server.listen(PORT);

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});