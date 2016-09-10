'use strict';

var express =  require('express');
var parser = require('body-parser');
var router = require('./api');

var app = express();

require('./database');
require('./seed');

app.use('/', express.static('public'));

app.use('/s/:id', express.static('public'));

app.use(parser.json());

app.use('/api', router);

app.listen(3000, function() {
	console.log('the server is running on port 3000');
})
