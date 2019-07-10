var express = require('express');
var fs = require('fs');
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
router.get('/leaverec', function(req, res, next) {

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

/* GET config 0017. */
var read_d0017 = function(req, res, next) {
    fs.readFile('./public/javascripts/d0017.json', 'utf-8', function(err, data) {
        if (err) {
            console.error(err);
        } else {
            var j_str = '{ "column": { "FACTOR": "指标", "TEXT": "描述" }, "items": ' + data + '}';
            res.json(JSON.parse(j_str));
        }
    });
}

var read_d0010 = function(req, res, next) {
    fs.readFile('./public/javascripts/d0010.json', 'utf-8', function(err, data) {
        if (err) {
            console.error(err);
        } else {
            var j_str = '{ "column": { "ZDATE": "日期", "ZZONE": "指标", "ZNUM": "序号", "ZREMARK": "备注" }, "items": ' + data + '}';
            res.json(JSON.parse(j_str));
        }
    });
}

router.get('/cfg0017', read_d0017);
router.get('/dat0010', read_d0010);

module.exports = router;