var express = require('express');
var goodGuy = require('good-guy-http')({ maxRetries: 3 });
var router = express.Router();
var jp = require('jsonpath');
/* GET home page. */
router.get('/', function (req, res, next) {
    var title=  'Nie ma',
        subtitle= 'ksionrzki',
        cover= 'http://searchengineland.com/figz/wp-content/seloads/2015/10/google-panda-name3-ss-1920-800x450.jpg'
    ;

    res.render('bookdefault', { title,subtitle,cover });
});
router.get('/:isbn', function (req, res, next) {
    var correlationId = req.headers['x-request-id'] || Math.random();
    req.esiOptions = {
    headers: {
      Accept: 'text/html',
      'X-Request-ID': correlationId
    }
  };
    goodGuy(`https://book-catalog-proxy-3.herokuapp.com/book?isbn=${req.params.isbn}`).then(function (response) {
        response = JSON.parse(response.body);
        var title = jp.query(response, '$..title');
        var subtitle = jp.query(response, '$..subtitle');
        var cover = jp.query(response, '$..thumbnail');
        res.render('book', {
            title, subtitle,isbn:req.params.isbn, cover,correlationId, partials: {
                layout: 'layout_file'
            }
        });

    }).catch(next);
});

module.exports = router;