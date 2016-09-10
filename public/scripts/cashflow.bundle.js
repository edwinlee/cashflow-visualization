webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('cashFlowApp', []);

	__webpack_require__(3);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	var shortid = __webpack_require__(4);

	angular.module('cashFlowApp')
	.controller('mainCtrl', function($scope, $log, $interval, dataService){
	  
	  //$scope.seconds = 0;

	  //$scope.counter = function() {
	  //  $scope.seconds++;
	  //  $log.log($scope.seconds + ' have passed');

	//  }

	//  $interval($scope.counter, 1000, 10);

	  dataService.getCashFlows(function(response){
	    var cashflows = response.data.cashflows;  
	    $scope.cashflows =  cashflows;
	    });
	  
	  $scope.addCashFlow = function() {
	    $scope.cashflows.unshift(
	    	{
	    		_id: shortid.generate(),
	    		income: {
	    			'enter type': 0,
	    			editing: true
	    		},
	            expenses: {
	            	'enter type' : 0,
	            	editing: true
	            }
	        }
	    );
	  };
	  
	})

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(5);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(6);
	var encode = __webpack_require__(8);
	var decode = __webpack_require__(10);
	var isValid = __webpack_require__(11);

	// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
	// This number should be updated every year or so to keep the generated id short.
	// To regenerate `new Date() - 0` and bump the version. Always bump the version!
	var REDUCE_TIME = 1459707606518;

	// don't change unless we change the algos or REDUCE_TIME
	// must be an integer and less than 16
	var version = 6;

	// if you are using cluster or multiple servers use this to make each instance
	// has a unique value for worker
	// Note: I don't know if this is automatically set when using third
	// party cluster solutions such as pm2.
	var clusterWorkerId = __webpack_require__(12) || 0;

	// Counter is used when shortid is called multiple times in one second.
	var counter;

	// Remember the last time shortid was called in case counter is needed.
	var previousSeconds;

	/**
	 * Generate unique id
	 * Returns string id
	 */
	function generate() {

	    var str = '';

	    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

	    if (seconds === previousSeconds) {
	        counter++;
	    } else {
	        counter = 0;
	        previousSeconds = seconds;
	    }

	    str = str + encode(alphabet.lookup, version);
	    str = str + encode(alphabet.lookup, clusterWorkerId);
	    if (counter > 0) {
	        str = str + encode(alphabet.lookup, counter);
	    }
	    str = str + encode(alphabet.lookup, seconds);

	    return str;
	}


	/**
	 * Set the seed.
	 * Highly recommended if you don't want people to try to figure out your id schema.
	 * exposed as shortid.seed(int)
	 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
	 */
	function seed(seedValue) {
	    alphabet.seed(seedValue);
	    return module.exports;
	}

	/**
	 * Set the cluster worker or machine id
	 * exposed as shortid.worker(int)
	 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
	 * returns shortid module so it can be chained.
	 */
	function worker(workerId) {
	    clusterWorkerId = workerId;
	    return module.exports;
	}

	/**
	 *
	 * sets new characters to use in the alphabet
	 * returns the shuffled alphabet
	 */
	function characters(newCharacters) {
	    if (newCharacters !== undefined) {
	        alphabet.characters(newCharacters);
	    }

	    return alphabet.shuffled();
	}


	// Export all other functions as properties of the generate function
	module.exports = generate;
	module.exports.generate = generate;
	module.exports.seed = seed;
	module.exports.worker = worker;
	module.exports.characters = characters;
	module.exports.decode = decode;
	module.exports.isValid = isValid;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomFromSeed = __webpack_require__(7);

	var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
	var alphabet;
	var previousSeed;

	var shuffled;

	function reset() {
	    shuffled = false;
	}

	function setCharacters(_alphabet_) {
	    if (!_alphabet_) {
	        if (alphabet !== ORIGINAL) {
	            alphabet = ORIGINAL;
	            reset();
	        }
	        return;
	    }

	    if (_alphabet_ === alphabet) {
	        return;
	    }

	    if (_alphabet_.length !== ORIGINAL.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
	    }

	    var unique = _alphabet_.split('').filter(function(item, ind, arr){
	       return ind !== arr.lastIndexOf(item);
	    });

	    if (unique.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
	    }

	    alphabet = _alphabet_;
	    reset();
	}

	function characters(_alphabet_) {
	    setCharacters(_alphabet_);
	    return alphabet;
	}

	function setSeed(seed) {
	    randomFromSeed.seed(seed);
	    if (previousSeed !== seed) {
	        reset();
	        previousSeed = seed;
	    }
	}

	function shuffle() {
	    if (!alphabet) {
	        setCharacters(ORIGINAL);
	    }

	    var sourceArray = alphabet.split('');
	    var targetArray = [];
	    var r = randomFromSeed.nextValue();
	    var characterIndex;

	    while (sourceArray.length > 0) {
	        r = randomFromSeed.nextValue();
	        characterIndex = Math.floor(r * sourceArray.length);
	        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
	    }
	    return targetArray.join('');
	}

	function getShuffled() {
	    if (shuffled) {
	        return shuffled;
	    }
	    shuffled = shuffle();
	    return shuffled;
	}

	/**
	 * lookup shuffled letter
	 * @param index
	 * @returns {string}
	 */
	function lookup(index) {
	    var alphabetShuffled = getShuffled();
	    return alphabetShuffled[index];
	}

	module.exports = {
	    characters: characters,
	    seed: setSeed,
	    lookup: lookup,
	    shuffled: getShuffled
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	// Found this seed-based random generator somewhere
	// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

	var seed = 1;

	/**
	 * return a random number based on a seed
	 * @param seed
	 * @returns {number}
	 */
	function getNextValue() {
	    seed = (seed * 9301 + 49297) % 233280;
	    return seed/(233280.0);
	}

	function setSeed(_seed_) {
	    seed = _seed_;
	}

	module.exports = {
	    nextValue: getNextValue,
	    seed: setSeed
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomByte = __webpack_require__(9);

	function encode(lookup, number) {
	    var loopCounter = 0;
	    var done;

	    var str = '';

	    while (!done) {
	        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
	        done = number < (Math.pow(16, loopCounter + 1 ) );
	        loopCounter++;
	    }
	    return str;
	}

	module.exports = encode;


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

	function randomByte() {
	    if (!crypto || !crypto.getRandomValues) {
	        return Math.floor(Math.random() * 256) & 0x30;
	    }
	    var dest = new Uint8Array(1);
	    crypto.getRandomValues(dest);
	    return dest[0] & 0x30;
	}

	module.exports = randomByte;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(6);

	/**
	 * Decode the id to get the version and worker
	 * Mainly for debugging and testing.
	 * @param id - the shortid-generated id.
	 */
	function decode(id) {
	    var characters = alphabet.shuffled();
	    return {
	        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
	        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
	    };
	}

	module.exports = decode;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(6);

	function isShortId(id) {
	    if (!id || typeof id !== 'string' || id.length < 6 ) {
	        return false;
	    }

	    var characters = alphabet.characters();
	    var len = id.length;
	    for(var i = 0; i < len;i++) {
	        if (characters.indexOf(id[i]) === -1) {
	            return false;
	        }
	    }
	    return true;
	}

	module.exports = isShortId;


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	module.exports = 0;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('cashFlowApp').config(function($locationProvider) {
	  $locationProvider.html5Mode(true);
	}).controller('cashFlowCtrl', function($scope, dataService) {

	  $scope.addIncome = function(cashflow) {
	    cashflow.income.push({'name': 'something', 'amount': 0});
	    //dataService.addIncome(cashflow);
	  };

	  $scope.addExpense = function(cashflow) {
	    cashflow.expenses.push({'name': 'something', 'amount': 0});
	    //dataService.addIncome(cashflow);
	  };

	  $scope.deleteCashFlow = function(cashflow, index) {
	    $scope.cashflows.splice(index, 1);
	    dataService.deleteCashFlow(cashflow);
	  };
	  
	  $scope.saveCashFlows = function() {
	    var filteredCashFlows = $scope.cashflows.filter(function(cashflow){
	      if(cashflow.edited) {
	        return cashflow;
	      }
	    });
	    dataService.saveCashFlows(filteredCashFlows).finally($scope.resetCashFlowState);
	  };

	  $scope.resetCashFlowState = function() {
	    $scope.cashflows.forEach(function(cashflow) {
	      cashflow.edited = false;
	    });
	  }
	});

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('cashFlowApp')
	.service('dataService', function($http, $q, $location) {
	  this.getCashFlows = function(cb) {

	    if($location.path() === '/') {
	      $http.get('/api/cashflows').then(cb);
	    } else {
	      $http.get('/api/cashflows/' + $location.path().split('/s/')[1].replace(/\/$/, '')).then(cb);
	    }
	    
	  };
	  
	  this.deleteCashFlow = function(cashflow) {
	    console.log("I deleted the " + cashflow.name + " cashflow!");
	  };

	  this.addIncome = function(cashflow) {
	  	var request;

	  	cashflow.income.push({'name': 'something', 'amount': 0});

	  	request = $http.put('/api/cashflows/' + cashflow._id, cashflow).then(function(result) {
	  		cashflow = result.data.cashflow;
	  		return cashflow;
	  	});

	  };
	  
	  this.saveCashFlows = function(cashflows) {
	  	console.log('hey it saved');
	  	var queue = [];

	  	cashflows.forEach(function(cashflow) {
	  		var request;
	  		if(!cashflow._id) {
	  			request = $http.post('/api/cashflows', cashflow);
	  		} else {
	  			request = $http.put('/api/cashflows/' + cashflow._id, cashflow).then(function(result) {
	  				cashflow = result.data.cashflow;
	  				return cashflow;
	  			});
	  		};
	  		console.log(cashflow);
	  		queue.push(request);
	  	});

	  	return $q.all(queue).then(function(results) {
	  		console.log('i saved x todos');
	  	});

	    console.log("I saved " + cashflows.length + " cashflows!");
	  };
	  
	});


/***/ }
]);