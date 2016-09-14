'use strict';

var angular = require('angular');

angular.module('cashFlowApp')
.directive('all', function(){
  return {
    templateUrl: '../templates/all.html',
    replace: true,
    controller: 'cashFlowCtrl'
  }
});