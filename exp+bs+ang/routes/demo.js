var express = require('express');
var router = express.Router();

router.get('/leave_request', function (req, res) {
  // viewpath = __dirname.replace('routes', 'views')
  // res.sendFile(viewpath + "/" + 'bs-leave_request.html');
  res.render('bs-leave_request', {})
});

router.get('/bs_demo', function (req, res) {
  // viewpath = __dirname.replace('routes', 'views')
  // res.sendFile(viewpath + "/" + 'bs-home.html');
  res.render('bs-home', {})
});

router.get('/welcome', (req, res) => {
  res.render('bs-welcome', {});
});

module.exports = router;