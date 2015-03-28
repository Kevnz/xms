var db = require('mongo-start')('pages');

module.exports = function (req, res, next) {
    var publishDate = new Date();
    console.log(publishDate);
    db.find({
        publishOn : { $exists: true, $nin: [null] }
        }, function (err, pages) {
        console.log(pages);
        if(!req.appData) {
            req.appData = {};
        }
        req.appData.publishedPages = pages;
        next();
    });
}