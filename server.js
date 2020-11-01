// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment'); // require

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

var formatQuery = "ddd, DD MMM YYYY HH:mm:ss [GMT]";

app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/timestamp/:input", function(req, res) {
  var m = isNaN(req.params.input) ? moment(req.params.input) : moment(parseInt(req.params.input));
  if(m.isValid()){
    res.json({ unix: parseInt(m.format("x")), utc: m.format(formatQuery)});
  }
  else {
    res.json({ error: "Invalid Date" });
  }
});

app.get("/api/timestamp", function(req, res) {
  m = moment();
  res.json({ unix: parseInt(m.format("x")), utc: m.format(formatQuery) });
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
