/**
 * Express demo
 */
const findPath = '../mosaisaiyo_modules';
const mongoTool = require(findPath+'/myMongoTool');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;

var easyMongo = new mongoTool();

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  

app.get('/', function(req, res) {
  res.redirect('http://example.com');
  console.log('get executed!');
});

var checkConnection = function (req, res, next) {
  function f() {
    if(typeof next==='function') next();
  }
  easyMongo.connectDB(f);
  console.log('check mongo connection!');
}

var bySystem = function (req, res, next) {
  function findResult(result) {
    res.findResult = result;
    if(typeof next==='function') next();
  }
  if (req.params && req.params.system) {
    var findOpt = easyMongo.getFindOption('local', 'customizing', {system:''});
    findOpt.whereStr.system = req.params.system;
    easyMongo.findRec(findOpt, findResult);
  }

  console.log('search data!');
}

var byId = function (req, res, next) {
  function findResult(result) {
    res.findResult = result;
    if(typeof next==='function') next();
  }
  if (req.params && req.params.id) {
    var findOpt = easyMongo.getFindOption('local', 'customizing', {_id:''});
    findOpt.whereStr._id = ObjectID(req.params.id);
    easyMongo.findRec(findOpt, findResult);
  }

  console.log('search data!');
}

var responseResult = function (req, res) {
  res.json(res.findResult);
  console.log('response find result!');
}

app.get('/id/:id', [checkConnection, byId, responseResult]);
app.get('/system/:system', [checkConnection, bySystem, responseResult]);

app.post('/', function(req, res) {
  res.json({say:'Hello World'});
  console.log('post executed!');
});

app.put('/', function(req,res) {
  res.send('Hello world');
  console.log('put executed!');
});

var server = app.listen(8081, function() {

  var host = server.address().address;
  var port = server.address().port;
  console.log('Access instance address is http://127.0.0.1:8081');

})