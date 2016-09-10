'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cashflows', function(err) {
	if (err) {
		console.log('failed connecting to mongodb');
	} else {
		console.log('successfully connected to mongodb');
	}
});