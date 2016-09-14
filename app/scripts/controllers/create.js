'use strict';

var angular = require('angular');

var shortid = require('shortid');

angular.module('cashFlowApp')
.controller('createCtrl', function($scope, $log, $interval, dataService){

  $scope.cashflows = [];

  $scope.addCashFlow = function() {
    $scope.cashflows.unshift(
      {
        _id: shortid.generate(),
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