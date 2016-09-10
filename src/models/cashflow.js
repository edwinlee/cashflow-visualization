'use strict';

var mongoose = require('mongoose');

var shortid = require('shortid');

// cashflow.name
// cashflow.completed

console.log(shortid.generate());

var cashflowSchema = new mongoose.Schema({
	_id: { type: String, 'default': shortid.generate },
	income: Object,
	expenses: Object
});

var model = mongoose.model('Cashflow', cashflowSchema);

module.exports = model;