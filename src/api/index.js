'use strict';

var express =  require('express');
var Cashflow = require('../models/cashflow');
//var cashflows = require('../../mock/cashflows.json');

var router = express.Router();

router.get('/cashflows', function(req, res) {
	
	Cashflow.find({}, function(err, cashflows) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({cashflows: cashflows});

	});

	
});

router.get('/cashflows/:id', function(req, res) {
	var id = req.params.id;
	
	Cashflow.findById(id, function(err, cashflows) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({cashflows: [cashflows]});

	});
	
});

router.post('/cashflows', function(req, res) {
	var cashflow = req.body;
	Cashflow.create(cashflow, function(err, cashflow) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({'cashflow': cashflow, message: 'Cashflow created'});
	});
});

router.put('/cashflows/:id', function(req, res) {
	var id = req.params.id;
	var cashflow = req.body;
	if(cashflow && cashflow._id !== id) {
		return res.status(500).json({err: "Ids don't match"});
	}
	Cashflow.findByIdAndUpdate(id, cashflow, {new: true}, function(err, cashflow) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({'cashflow': cashflow, message: 'Cashflow updated'});
	});
});

module.exports = router;