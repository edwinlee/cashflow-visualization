'use strict';

var angular = require('angular');

angular.module('cashFlowApp')
.directive('create', function(){
  return {
    templateUrl: '../templates/create.html',
    replace: true,
    controller: 'cashFlowCtrl'
  }
}).directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$window.getSelection().toString()) {
                    this.setSelectionRange(0, this.value.length)
                }
            });
        }
    };
}]);