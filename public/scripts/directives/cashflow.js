'use strict';

angular.module('cashFlowApp')
.directive('cashflow', function(){
  return {
    templateUrl: 'templates/cashflow.html',
    replace: true,
    controller: 'cashFlowCtrl'
  }
});