var express = require('express');
var router = express.Router();

router.get('/leave_request',function(req,res) {
  viewpath=__dirname.replace('routes','views')
  res.sendFile(viewpath  + "/" +'bs-leave_request.html');
});

router.get('/bs_demo',function(req,res) {
  viewpath=__dirname.replace('routes','views')
  res.sendFile(viewpath  + "/" +'bs-home.html');
});

module.exports = router;
