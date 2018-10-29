/**
 * This is simple test for mongoDB
 * mosaisaiyo modules is required to run this demo
 */
const findPath = '../mosaisaiyo_modules';

const mongoTool = require(findPath+'/myMongoTool');
const batchTool = require(findPath+'/myBatchTool');

var MongoDB = new mongoTool();
var Batch = new batchTool();

var finalResult = [];

var findResult = function(result) {
  setTimeout(function(){
    console.log(result);
  },1000);
}

var updateResult = function(res) {
  console.log(res.result.nModified + " record(s) is updated!");
}

var insertResult = function(res) {
  console.log(JSON.stringify(res));
  return;
}

var dbConnected = function() {
  /** case definition **/
  function find_sync() {
    //Batch 1
    var b = Batch.regBatch();
    b.execBody = function() {
      if (arguments.length===1) 
		finalResult = finalResult.concat(arguments[0]);
    }

    //Batch 2
    var c = Batch.regBatch();
    c.execBody = function() {
      if (arguments.length===1) 
		finalResult = finalResult.concat(arguments[0]);
    }

    //Batch finalize
    Batch.batchFinalize = function() { 
      console.log(finalResult);
      MongoDB.disconnectDB();
    }

    var findOpt_1 = MongoDB.getFindOption('local', 'customizing', {system:'SAP'});
    MongoDB.findRec(findOpt_1, b.callback);

    var findOpt_2 = MongoDB.getFindOption('local', 'customizing', {system:'Node.js'});
    MongoDB.findRec(findOpt_2, c.callback);
  }

  function find_async() {
    var findOpt_1 = MongoDB.getFindOption('local', 'customizing', {system:'SAP'});
    MongoDB.findRec(findOpt_1, findResult);

    var findOpt_2 = MongoDB.getFindOption('local', 'customizing', {system:'Node.js'});
    MongoDB.findRec(findOpt_2, findResult);
  }
  
  function find_all() {
    var findOpt = MongoDB.getFindOption('local', 'customizing', {});
    MongoDB.findRec(findOpt, findResult);
  }

  function update_async() {
    var updateOpt = MongoDB.getUpdateOption('local', 
	                                    'customizing',
	                                    { system : 'JavaScript',
                                              name : 'Table' }, 
                                            { $set : { 	list : [ 'T001', 'T001M', 'T001K' ]}});
    updateOpt.updateStr.$set.createTimestamp = new Date().toString();
    MongoDB.updateRec(updateOpt, updateResult);	
  }

  function insert_async() {
    
    var data = {
	system: 'JavaScript',
	category: 'Configuration',
	name: 'NEW',
	value: 'TBD',
	list: [],
	createTimestamp: null
	}; 
    var insertOption = MongoDB.getInsertOption('local', 'customizing', data);
    MongoDB.insertOne(insertOption, insertResult);
  }

  /** case run **/	

  //find_sync();
  //find_all();
  update_async();
  // insert_async();

}

MongoDB.connectDB(dbConnected);

