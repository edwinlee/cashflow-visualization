'use strict';

var angular = require('angular');

angular.module('cashFlowApp').config(function($locationProvider) {
  $locationProvider.html5Mode(true);
}).controller('cashFlowCtrl', function($scope, dataService) {

  $scope.addIncome = function(cashflow) {
    cashflow.income.push({'name': 'something', 'amount': 0});
    //dataService.addIncome(cashflow);
  };

  $scope.addExpense = function(cashflow) {
    cashflow.expenses.push({'name': 'something', 'amount': 0});
    //dataService.addIncome(cashflow);
  };

  $scope.deleteCashFlow = function(cashflow, index) {
    $scope.cashflows.splice(index, 1);
    dataService.deleteCashFlow(cashflow);
  };
  
  $scope.saveCashFlows = function() {
    var filteredCashFlows = $scope.cashflows.filter(function(cashflow){
      if(cashflow.edited) {
        return cashflow;
      }
    });
    dataService.saveCashFlows(filteredCashFlows).finally($scope.resetCashFlowState);
  };

  $scope.resetCashFlowState = function() {
    $scope.cashflows.forEach(function(cashflow) {
      cashflow.edited = false;
    });
  }
});