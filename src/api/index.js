'use strict';

var express =  require('express');
var cashflows = require('../../mock/cashflows.json');

var router = express.Router();

router.get('/cashflows', function(req, res) {
	res.json({cashflows: cashflows});
});

module.exports = router;