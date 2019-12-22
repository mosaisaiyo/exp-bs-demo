var express = require('express');
var router = express.Router();

router.get('/001', function(req, res) {
    res.render('../public/app/demo-001/view/style', {})
});



module.exports = router;