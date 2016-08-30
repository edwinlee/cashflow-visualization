'use strict';

angular.module('cashFlowApp')
.service('dataService', function($http) {
  this.getCashFlows = function(cb) {
    $http.get('/mock/cashflows.json').then(cb);
  };
  
  this.deleteCashFlow = function(cashflow) {
    console.log("I deleted the " + cashflow.name + " cashflow!");
  };
  
  this.saveCashFlows = function(cashflows) {
    console.log("I saved " + cashflows.length + " cashflows!");
  };
  
});
