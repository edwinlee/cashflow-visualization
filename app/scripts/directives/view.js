'use strict';

var angular = require('angular');

angular.module('cashFlowApp')
.directive('view', function(){
  return {
    templateUrl: '../templates/view.html',
    replace: true,
    controller: 'cashFlowCtrl'
  }
});