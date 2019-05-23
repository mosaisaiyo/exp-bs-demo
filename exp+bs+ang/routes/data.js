var express = require('express');
var router = express.Router();

var initData = [{
	id: '1',
	action: '',
	act_type: 'Annual Leave',
	start_date: '2019.04.29',
	end_date: '2019.04.30',
	processor: 'Manager',
	ori_type: '',
	ori_start: '',
	ori_end: '',
	status: 'post',
	notes: '',
	used: '2 days'
}, {
	id: '2',
	action: '',
	act_type: 'Sick Leave(Full Pay)',
	start_date: '2019.04.15',
	end_date: '2019.04.15',
	processor: 'Manager',
	ori_type: '',
	ori_start: '',
	ori_end: '',
	status: 'post',
	notes: '',
	used: '1 days'
}, {
	id: '3',
	action: '',
	act_type: 'Annual Leave',
	start_date: '2019.04.04',
	end_date: '2019.04.04',
	processor: 'Manager',
	ori_type: '',
	ori_start: '',
	ori_end: '',
	status: 'post',
	notes: '',
	used: '1 days'
}, {
	id: '4',
	action: '',
	act_type: 'Annual Leave',
	start_date: '2019.03.14',
	end_date: '2019.03.15',
	processor: 'Manager',
	ori_type: '',
	ori_start: '',
	ori_end: '',
	status: 'post',
	notes: '',
	used: '2 days'
}, {
	id: '5',
	action: '',
	act_type: 'Conpassionate Leave',
	start_date: '2019.03.11',
	end_date: '2019.03.13',
	processor: 'Manager',
	ori_type: '',
	ori_start: '',
	ori_end: '',
	status: 'post',
	notes: '',
	used: ''
}];

var demoData = {
	id: '0',
	action: '',
	act_type: 'Demo Type',
	start_date: '2019.05.01',
	end_date: '2019.05.31',
	processor: 'Tester',
	ori_type: '',
	ori_start: '',
	ori_end: '',
	status: 'open',
	notes: '',
	used: '31 days'
};

var idCnt = 0;

/* GET users listing. */
router.get('/leaverec', function (req, res, next) {

	if (req.query["action"] == "init") {
		idCnt = idCnt + initData.length;
		res.json(initData);
		return;
	}
		
	if (req.query["action"] == "new") {
		idCnt = idCnt + 1;
		demoData["id"] = idCnt.toString();
		res.json(demoData);
		return;
	}
		
});

module.exports = router;