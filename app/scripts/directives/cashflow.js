'use strict';

var angular = require('angular');

angular.module('cashFlowApp')
.directive('cashflow', function(){
  return {
    templateUrl: 'templates/cashflow.html',
    replace: true,
    controller: 'cashFlowCtrl'
  }
});