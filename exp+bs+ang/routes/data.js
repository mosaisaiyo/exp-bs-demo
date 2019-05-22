var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/leaverec', function (req, res, next) {

	var demoData = {
		id: '0',
		action: '',
		act_type: 'Demo Type',
		start_date: '2019.05.01',
		end_date: '2019.05.31',
		processor: 'RyanXiong',
		ori_type: '',
		ori_start: '',
		ori_end: '',
		status: 'open',
		notes: '',
		used: '31 days'
	};

	res.json(demoData);
});

module.exports = router;