var db = require('mongo-start')('pages');

module.exports = function (req, res, next) {
    var publishDate = new Date();
    console.log(publishDate);
    db.find({
        publishOn: { $lt: new Date() }
    }, function (err, pages) {
        console.log(pages);
        if(!req.xmsData) {
            req.xmsData = {};
        }
        req.xmsData.publishedPages = pages;
        next();
    });
}