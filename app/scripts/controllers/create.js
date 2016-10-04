'use strict';

var angular = require('angular');

var shortid = require('shortid');

angular.module('cashFlowApp')
.controller('createCtrl', function($scope, $log, $interval, dataService){

  $scope.cashflows = [];

  $scope.cashflows.unshift(
    {
      _id: shortid.generate(),
      income: [
        {
          name: 'Paycheck',
          amount: 0
        }
      ],
      expenses: [
        {
          name: 'Rent',
          amount: 0
        },
        {
          name: 'Groceries',
          amount: 0
        },
        {
          name: 'Car payment',
          amount: 0
        },
        {
          name: 'Shopping',
          amount: 0
        },
        {
          name: 'Eating out',
          amount: 0
        },
        {
          name: 'Cell phone',
          amount: 0
        },
        {
          name: 'Entertainment',
          amount: 0
        },
        {
          name: 'Utilities',
          amount: 0
        },
        {
          name: 'Misc',
          amount: 0
        }
      ],
      edited: true
    }
  );  
  
})