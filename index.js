var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
app.use(function(req, res, next) {
  res.redirect(301, 'https://www.artsy.net' + req.url);
});
app.listen(port, function() {
	console.log("Listening on " + port);
});