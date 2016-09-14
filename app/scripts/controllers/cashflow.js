'use strict';

var angular = require('angular');

angular.module('cashFlowApp').config(function($locationProvider) {
  $locationProvider.html5Mode(true);
}).controller('cashFlowCtrl', function($scope, $location, $window, dataService) {

  $scope.addIncome = function(cashflow) {
    cashflow.income.push({'name': '', 'amount': 0});
  };

  $scope.removeIncome = function(cashflow, index) {
    cashflow.income.splice(index, 1);
  };

  $scope.addExpense = function(cashflow) {
    cashflow.expenses.push({'name': '', 'amount': 0});
  };

  $scope.removeExpense = function(cashflow, index) {
    cashflow.expenses.splice(index, 1);
  };

  $scope.deleteCashFlow = function(cashflow, index) {
    $scope.cashflows.splice(index, 1);
    dataService.deleteCashFlow(cashflow, index);
  };
  
  $scope.saveCashFlows = function() {
    var filteredCashFlows = $scope.cashflows.filter(function(cashflow){
      if(cashflow.edited) {
        return cashflow;
      }
    });
    return(dataService.saveCashFlows(filteredCashFlows).finally($scope.resetCashFlowState));
  };

  $scope.createCashFlow = function(cashflow) {

    dataService.createCashFlow(cashflow);

    $location.path('/s/' + cashflow._id);
    $window.location.reload();

  };

  $scope.resetCashFlowState = function() {
    $scope.cashflows.forEach(function(cashflow) {
      cashflow.edited = false;
    });
  };

  //$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  //$scope.data = [300, 500, 100];

})