'use strict';

var angular = require('angular');

angular.module('cashFlowApp')
.service('dataService', function($http, $q, $window, $location) {
  this.getCashFlows = function(cb) {

    if($location.path() === '/all/') {
      $http.get('/api/cashflows').then(cb);
    } else {
      $http.get('/api/cashflows/' + $location.path().split('/s/')[1].replace(/\/$/, '')).then(cb);
    }    
    
  };
  
  this.deleteCashFlow = function(cashflow, index) {
    console.log("I deleted the " + cashflow + " cashflow!");


    var request = $http.delete('/api/cashflows/' + cashflow._id, cashflow).then(function(result) {
        cashflow = result.data.cashflow;
        $window.location.href = '/s/' + cashflow._id;
        return cashflow;
    });


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
  	var queue = [];

  	cashflows.forEach(function(cashflow) {
  		var request;
  		if(!cashflow._id) {
  			request = $http.post('/api/cashflows', cashflow).then(function(result) {
          cashflow = result.data.cashflow;
          return cashflow;
        });

  		} else {
  			request = $http.put('/api/cashflows/' + cashflow._id, cashflow).then(function(result) {
  				cashflow = result.data.cashflow;
  				return cashflow;
  			});
  		};

  		queue.push(request);
  	});

  	return $q.all(queue).then(function(results) {

  	});

  };

  this.createCashFlow = function(cashflow) {

    var request = $http.post('/api/cashflows', cashflow).then(function(result) {
      cashflow = result.data.cashflow;

      $window.location.href = '/s/' + cashflow._id;

      return cashflow;
    });

  };
    
});
