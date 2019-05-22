var express = require('express');
var router = express.Router();

router.get('/home', function (req, res, next) {
    if (!req.session.user) {
        req.session.error = '请先登陆';
        return res.redirect('/portal/login');
    }
    next();
});

router.get('/home', function (req, res) {
    var user = {
        username: 'guest',
        password: 'tbd'
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
    res.redirect('../');
});

module.exports = router;
