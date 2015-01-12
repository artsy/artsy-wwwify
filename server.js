var express = require('express');
var https = require('https');
var http = require('http');
var path = require('path');
var fs = require('fs');
var options = {
  key: fs.readFileSync(__dirname + '/shared/config/ssl.key'),
  cert: fs.readFileSync(__dirname + '/shared/config/ssl.crt')
};
var app = express();
app.use(function(req, res, next) {
  res.setHeader('Strict-Transport-Security', 'max-age=0');
  res.redirect(301, 'https://www.artsy.net' + req.url);
});
http.createServer(app).listen(80);
https.createServer(options, app).listen(443);