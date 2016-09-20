var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'hahahhah' });
});
router.get('/:isbn', function (req, res, next) {
    request('https://book-catalog-proxy-1.herokuapp.com/book?isbn=' + req.params.isbn, function (error, response, body) {
        body = JSON.parse(body);
        if (error || !body.items) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        } else {
            res.render('book', { body: body.items[0].volumeInfo });
        }
    });
});

module.exports = router;