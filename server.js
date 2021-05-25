var path = require('path');
var artsyEigenWebAssociation = require('artsy-eigen-web-association');
var iosVerificationFileName = path.resolve(__dirname, 'apple-developer-domain-association.txt');
var androidVerificationFileName = path.resolve(__dirname, 'assetlinks.json');
var options = { 'headers': { 'Content-Type': 'text/plain' } };

var express = require('express');
var http = require('http');
var morgan = require('morgan');
var app = express();
app.use(morgan('combined'));
app.use('/(.well-known/)?apple-app-site-association', artsyEigenWebAssociation);

app.get('/.well-known/apple-developer-domain-association.txt', function (req, res) {
  res.sendFile(iosVerificationFileName, options, function (error) {
    if (error) {
      console.log(error);
      code = error.status >= 100 && error.status < 600 ? error.status : 500
      response.status(code).end();
    }
  })
})

app.get('/.well-known/assetlinks.json', function (req, res) {
  res.sendFile(androidVerificationFileName, options, function (error) {
    if (error) {
      console.log(error);
      code = error.status >= 100 && error.status < 600 ? error.status : 500
      response.status(code).end();
    }
  })
})

app.get('/ping', function (req, res) { res.send('pong'); });
app.use(function (req, res, next) {
  res.setHeader('Strict-Transport-Security', 'max-age=0');
  res.redirect(301, 'https://www.artsy.net' + req.url);
});
module.exports = http.createServer(app).listen(3000);
