webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('cashFlowApp', []);

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('cashFlowApp')
	.controller('mainCtrl', function($scope, dataService){
	  
	  dataService.getCashFlows(function(response){
	    var cashflows = response.data.cashflows;  
	    $scope.cashflows =  cashflows;
	    });
	  
	  $scope.addCashFlow = function() {
	    $scope.cashflows.unshift({name: "This is a new cash flow.",
	                      completed: false});
	  };
	  
	})

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('cashFlowApp')
	.controller('cashFlowCtrl', function($scope, dataService) {
	  $scope.deleteCashFlow = function(cashflow, index) {
	    $scope.cashflows.splice(index, 1);
	    dataService.deleteCashFlow(cashflow);
	  };
	  
	  $scope.saveCashFlow = function() {
	    var filteredCashFlows = $scope.cashflows.filter(function(cashflow){
	      if(cashflow.edited) {
	        return cashflow
	      };
	    })
	    dataService.saveTodos(filteredCashFlows);
	  }; 
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('cashFlowApp')
	.directive('cashflow', function(){
	  return {
	    templateUrl: 'templates/cashflow.html',
	    replace: true,
	    controller: 'cashFlowCtrl'
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('cashFlowApp')
	.service('dataService', function($http) {
	  this.getCashFlows = function(cb) {
	    $http.get('/api/cashflows').then(cb);
	  };
	  
	  this.deleteCashFlow = function(cashflow) {
	    console.log("I deleted the " + cashflow.name + " cashflow!");
	  };
	  
	  this.saveCashFlows = function(cashflows) {
	    console.log("I saved " + cashflows.length + " cashflows!");
	  };
	  
	});


/***/ }
]);