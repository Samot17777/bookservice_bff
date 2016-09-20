var express = require('express');
var goodGuy = require('good-guy-http')({maxRetries: 3});
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    var body = {
        title: 'Nie ma',
        subtitle: 'ksionrzki',
        imageLinks: {
            thumbnail: 'http://searchengineland.com/figz/wp-content/seloads/2015/10/google-panda-name3-ss-1920-800x450.jpg'
        }
    };
    res.render('book', { body: body });
});
router.get('/:isbn', function (req, res, next) {
    goodGuy(`https://book-catalog-proxy-1.herokuapp.com/book?isbn=${req.params.isbn}`).then(function (response) {
        var body = JSON.parse(response.body);
        res.render('book', { body: body.items[0].volumeInfo });
    }).catch(next);
});

module.exports = router;