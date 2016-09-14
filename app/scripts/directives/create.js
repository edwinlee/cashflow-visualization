'use strict';

var angular = require('angular');

angular.module('cashFlowApp')
.directive('create', function(){
  return {
    templateUrl: '../templates/create.html',
    replace: true,
    controller: 'cashFlowCtrl'
  }
});