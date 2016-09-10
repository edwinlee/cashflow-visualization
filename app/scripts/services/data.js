'use strict';

var angular = require('angular');

angular.module('cashFlowApp')
.service('dataService', function($http, $q, $location) {
  this.getCashFlows = function(cb) {

    if($location.path() === '/') {
      $http.get('/api/cashflows').then(cb);
    } else {
      $http.get('/api/cashflows/' + $location.path().split('/s/')[1].replace(/\/$/, '')).then(cb);
    }
    
  };
  
  this.deleteCashFlow = function(cashflow) {
    console.log("I deleted the " + cashflow.name + " cashflow!");
  };

  this.addIncome = function(cashflow) {
  	var request;

  	cashflow.income.push({'name': 'something', 'amount': 0});

  	request = $http.put('/api/cashflows/' + cashflow._id, cashflow).then(function(result) {
  		cashflow = result.data.cashflow;
  		return cashflow;
  	});

  };
  
  this.saveCashFlows = function(cashflows) {
  	console.log('hey it saved');
  	var queue = [];

  	cashflows.forEach(function(cashflow) {
  		var request;
  		if(!cashflow._id) {
  			request = $http.post('/api/cashflows', cashflow);
  		} else {
  			request = $http.put('/api/cashflows/' + cashflow._id, cashflow).then(function(result) {
  				cashflow = result.data.cashflow;
  				return cashflow;
  			});
  		};
  		console.log(cashflow);
  		queue.push(request);
  	});

  	return $q.all(queue).then(function(results) {
  		console.log('i saved x todos');
  	});

    console.log("I saved " + cashflows.length + " cashflows!");
  };
  
});
