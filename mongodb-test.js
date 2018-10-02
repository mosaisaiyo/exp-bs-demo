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
  return;
}

var dbConnected = function() {
  /** case definition **/
  function case1() {
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

    var findOpt_1 = {
	dbName : 'local',
	collection : 'customizing',
	whereStr : {
	  system : 'SAP'
	}
    };
    MongoDB.findRec(findOpt_1, b.callback);

    var findOpt_2 = {
	dbName : 'local',
	collection : 'customizing',
	whereStr : {
	  system : 'Node.js'
	}
    };
    MongoDB.findRec(findOpt_2, c.callback);
  }

  function case2() {
    var findOpt_1 = {
	dbName : 'local',
	collection : 'customizing',
	whereStr : {
	  system : 'SAP'
	}
    };
    MongoDB.findRec(findOpt_1, findResult);

    var findOpt_2 = {
	dbName : 'local',
	collection : 'customizing',
	whereStr : {
	  system : 'JavaScript'
	}
    };
    MongoDB.findRec(findOpt_2, findResult);
  }

  function case3() {
    MongoDB.updateRec('local', 
	'customizing', 
	{system : 'JavaScript', name : 'USR_DEFLT'},
	{$set: { list : ['UF050473', 'UF050474', 'UF050442']}},
	updateResult);	
  }

  function case4() {
    var insertOption = {
	dbName : 'local',
	collection : 'customizing',
	data : {
	  system: 'JavaScript',
	  category: 'Configuration',
	  name: 'NAME',
	  value: 'VALUE',
	  list: [],
	  createTimestamp: null
	}
    }; 
    MongoDB.insertOne(insertOption, insertResult);
  }

  /** case run **/	

  case1();

}

MongoDB.connectDB(dbConnected);

