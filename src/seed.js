'use strict';

var Cashflow = require('./models/cashflow');

var shortid = require('shortid');

var cashflows = [
	{
		_id: 'a2s5f4',
		income: [
			{
				name: 'paycheck',
				amount: 4000
			}
		],
		expenses: [
			{
				name: 'fitness',
				amount: 350
			}, {
				name: 'shopping',
				amount: 340
			}, {
				name: 'fees',
				amount: 25
			}, {
				name: 'auto',
				amount: 200
			}, {
				name: 'food',
				amount: 400
			}, {
				name: 'housing',
				amount: 1250
			}
		]
	},
	{
		_id: 'p93nsK',
		income: [
			{
				name: 'paycheck',
				amount: 6000
			}
		],
		expenses: [
			{
				name: 'fitness',
				amount: 350
			}, {
				name: 'shopping',
				amount: 340
			}, {
				name: 'fees',
				amount: 25
			}, {
				name: 'auto',
				amount: 200
			}, {
				name: 'food',
				amount: 400
			}, {
				name: 'housing',
				amount: 1250
			}
		]
	},
	{
		_id: 'h8s920',
		income: [
			{
				name: 'paycheck',
				amount: 10000
			}
		],
		expenses: [
			{
				name: 'fitness',
				amount: 350
			}, {
				name: 'shopping',
				amount: 340
			}, {
				name: 'fees',
				amount: 25
			}, {
				name: 'auto',
				amount: 200
			}, {
				name: 'food',
				amount: 400
			}, {
				name: 'housing',
				amount: 1250
			}
		]
	}
];

cashflows.forEach(function (cashflow, index) {
  Cashflow.find({ _id: cashflow._id }, function(err, cashflows) {
  	
  	if (!err && !cashflows.length) {
      Cashflow.create({ 
      	_id: cashflow._id,
      	income: cashflow.income,
      	expenses: cashflow.expenses
      });
  	}
  	
  });
});
