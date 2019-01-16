var artsyEigenWebAssociation = require('artsy-eigen-web-association');
var express = require('express');
var https = require('https');
var http = require('http');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');
var app = express();
var nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'
var port = nodeEnv == 'production' ? 80 : 3000
var ssl = nodeEnv == 'production'
app.use(morgan('combined'));
app.use('/(.well-known/)?apple-app-site-association', artsyEigenWebAssociation);
app.use(function(req, res, next) {
  res.setHeader('Strict-Transport-Security', 'max-age=0');
  res.redirect(301, 'https://www.artsy.net' + req.url);
});
http.createServer(app).listen(port);
if (ssl) {
  https.createServer({
    key: fs.readFileSync('/srv/www/artsy_wwwify/shared/config/ssl.key').toString(),
    cert: fs.readFileSync('/srv/www/artsy_wwwify/shared/config/ssl.crt').toString()
  }, app).listen(443);
}
