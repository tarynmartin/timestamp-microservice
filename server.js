// server.js
// where your node app starts

const dayjs = require('dayjs');
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// adding ? to a parameter makes it optional
app.get("/api/:date?", (req, res) => {
  const newDate = new Date(req.params.date);
  const parsed = dayjs(parseInt(req.params.date));

  if (!req.params.date) {
    res.json({ unix: dayjs().format('x'), utc: dayjs() });
  } else if (!parsed.isValid()) {
    res.json({ error: 'Invalid Date' });
  } else if (req.params.date.includes('-')) {
    res.json({ unix: dayjs(req.params.date).format('x'), utc: newDate });
  } else {
    res.json({ unix: req.params.date, utc: parsed })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
