'use strict';

var angular = require('angular');

var shortid = require('shortid');

angular.module('cashFlowApp')
.controller('viewCtrl', function($scope, $log, $window, $interval, dataService){
  
  //$scope.seconds = 0;

  //$scope.counter = function() {
  //  $scope.seconds++;
  //  $log.log($scope.seconds + ' have passed');

//  }

//  $interval($scope.counter, 1000, 10);

  dataService.getCashFlows(function(response){
    var cashflows = response.data.cashflows;  
    $scope.cashflows =  cashflows;

    $scope.expenses = cashflows[0].expenses;
    $scope.totalExpenses = 0;

    $scope.income = cashflows[0].income;
    $scope.totalIncome = 0;

    $scope.labels = [];
    $scope.data = [];

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $scope.options = {
      legend: { 
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 12
        }
      },
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
          label: function(tooltipItem, data) {
            var label = data.labels[tooltipItem.index];
            var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return capitalize(label) + ': $' + parseFloat(datasetLabel).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + ' (' + Math.round(datasetLabel/$scope.totalIncome * 100) + '%)';
          }
        }
      },
    };

    for (var i = 0; i < $scope.expenses.length; i++) {
      if ($scope.expenses[i].amount > 0) {
        $scope.labels.push(capitalize($scope.expenses[i].name));
        $scope.data.push($scope.expenses[i].amount);
        $scope.totalExpenses += parseInt($scope.expenses[i].amount);
      }
      
    }

    for (var i = 0; i < $scope.income.length; i++) {
      $scope.totalIncome += parseInt($scope.income[i].amount);
    }
    
    $scope.netSavings = $scope.totalIncome - $scope.totalExpenses;
    
    if($scope.netSavings > 0) {
      $scope.labels.push('Savings');
      $scope.data.push($scope.netSavings);
    }

    $scope.pageURL = $window.location.href;
    
  });

  
})