'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cashflow', function(err) {
	if (err) {
		console.log('failed connecting to mongodb');
	} else {
		console.log('successfully connected to mongodb');
	}
});