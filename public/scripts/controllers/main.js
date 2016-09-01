'use strict';

angular.module('cashFlowApp')
.controller('mainCtrl', function($scope, dataService){
  
  dataService.getCashFlows(function(response){
    var cashflows = response.data.cashflows;  
    $scope.cashflows =  cashflows;
    });
  
  $scope.addCashFlow = function() {
    $scope.cashflows.unshift({name: "This is a new cash flow.",
                      completed: false});
  };
  
})