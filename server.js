var express = require('express');
var http = require('http');
var morgan = require('morgan');
var app = express();
app.use(morgan('combined'));

app.get('/ping', function (req, res) { res.send('pong'); });
app.use(function (req, res, next) {
  res.setHeader('Strict-Transport-Security', 'max-age=0');
  res.redirect(301, 'https://www.artsy.net' + req.url);
});
module.exports = http.createServer(app).listen(3000);
