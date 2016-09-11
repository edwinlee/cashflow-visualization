'use strict';

var angular = require('angular');

var shortid = require('shortid');

angular.module('cashFlowApp')
.controller('mainCtrl', function($scope, $log, $interval, dataService){
  
  //$scope.seconds = 0;

  //$scope.counter = function() {
  //  $scope.seconds++;
  //  $log.log($scope.seconds + ' have passed');

//  }

//  $interval($scope.counter, 1000, 10);

  dataService.getCashFlows(function(response){
    var cashflows = response.data.cashflows;  
    $scope.cashflows =  cashflows;
    });
  
  $scope.addCashFlow = function() {
    $scope.cashflows.unshift(
    	{
    		income: [
          {
            name: 'enter type',
            amount: 0
          }
    		],
        expenses: [
          {
        	  name: 'enter type',
            amount: 0
          }
        ],
        edited: true
      }
    );
  };
  
})