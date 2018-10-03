/**
 * Express demo
 */
const findPath = '../mosaisaiyo_modules';
const mongoTool = require(findPath+'/myMongoTool');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var easyMongo = new mongoTool();

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  

app.get('/', function(req, res) {
  res.redirect('http://example.com');
  console.log('get executed!');
});

app.get('/Book(:id)', function(req, res) {
  res.send('Good');
  console.log('get Book!');
});

app.get('/Book', function(req, res) {
  res.json(req.query);
  console.log('get Book!');
});

var checkConnection = function (req, res, next) {
  function f() {
    if(typeof next==='function') next();
  }
  easyMongo.connectDB(f);
  console.log('check mongo connection!');
}

var searchData = function (req, res, next) {
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

var responseResult = function (req, res) {
  res.json(res.findResult);
  console.log('response find result!');
}

app.get('/:system', [checkConnection, searchData, responseResult]);


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