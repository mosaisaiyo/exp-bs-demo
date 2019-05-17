var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

});

router.get('/home', function (req, res) {
    var user = {
        username: 'admin',
        password: 'admin'
    }
    res.render('home', { title: 'Home', user: user });
});

router.get('/login', function (req, res) {
    res.render('login', {});
});

router.post('/login', function (req, res) {
    var user = {
        username: 'admin',
        password: 'admin'
    }
    if (req.body.username === user.username && req.body.password === user.password) {
        req.session.user = user;
        return res.redirect('/portal/home');
    } else {
        return res.redirect('/portal/login');
    }
});

router.get('/logout', (req, res) => {
    res.redirect('http://127.0.0.1:3000');
});

module.exports = router;