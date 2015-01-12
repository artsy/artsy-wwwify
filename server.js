var express = require('express');
var app = express();
app.set('port', 443);
app.use(function(req, res, next) {
  res.setHeader('Strict-Transport-Security', 'max-age=0');
  res.redirect(301, 'https://www.artsy.net' + req.url);
});
app.listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});