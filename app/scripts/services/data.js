'use strict';

var angular = require('angular');

angular.module('cashFlowApp')
.service('dataService', function($http) {
  this.getCashFlows = function(cb) {
    $http.get('/api/cashflows').then(cb);
  };
  
  this.deleteCashFlow = function(cashflow) {
    console.log("I deleted the " + cashflow.name + " cashflow!");
  };
  
  this.saveCashFlows = function(cashflows) {
    console.log("I saved " + cashflows.length + " cashflows!");
  };
  
});
