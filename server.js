var express = require('express');
var app = express();

// logger
app.use(function(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
});

app.use(express.static(__dirname + '/editor'));

app.listen(9000);
