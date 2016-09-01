'use strict';

var angular = require('angular');

angular.module('cashFlowApp')
.controller('cashFlowCtrl', function($scope, dataService) {
  $scope.deleteCashFlow = function(cashflow, index) {
    $scope.cashflows.splice(index, 1);
    dataService.deleteCashFlow(cashflow);
  };
  
  $scope.saveCashFlow = function() {
    var filteredCashFlows = $scope.cashflows.filter(function(cashflow){
      if(cashflow.edited) {
        return cashflow
      };
    })
    dataService.saveTodos(filteredCashFlows);
  }; 
});