'use strict';

var angular = require('angular');

var shortid = require('shortid');

angular.module('cashFlowApp')
.controller('viewCtrl', function($scope, $log, $interval, dataService){
  
  //$scope.seconds = 0;

  //$scope.counter = function() {
  //  $scope.seconds++;
  //  $log.log($scope.seconds + ' have passed');

//  }

//  $interval($scope.counter, 1000, 10);

  dataService.getCashFlows(function(response){
    var cashflows = response.data.cashflows;  
    $scope.cashflows =  cashflows;

    $scope.labels = [cashflows[0].expenses[0].name, cashflows[0].expenses[1].name, cashflows[0].expenses[3].name];
    $scope.data = [cashflows[0].expenses[0].amount, cashflows[0].expenses[1].amount, cashflows[0].expenses[3].amount];
  });

  
})