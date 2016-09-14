'use strict';

var angular = require('angular');

angular.module('cashFlowApp', ['chart.js']);

require('./scripts/controllers/all.js');
require('./scripts/controllers/create.js');
require('./scripts/controllers/view.js');
require('./scripts/controllers/cashflow.js');

require('./scripts/directives/create.js');
require('./scripts/directives/all.js');
require('./scripts/directives/view.js');

require('./scripts/services/data.js');
require('../node_modules/chart.js/dist/Chart.min.js');
require('../node_modules/angular-chart.js/dist/angular-chart.min.js');