module.exports = { 
        handler: function (req, res, next) {
            console.log('in xms handler');
            var pages = require('mongo-start')('pages');
            pages.findOne({route:req.path}, function (err, data) {
                if(data) {
                    res.locals.xms = data; 
                } else {
                    console.log('xms');
                    res.locals.xms = {
                        content: "No content was found",
                        title: "Not found"
                    }
                }
                if(err) {}

                next();
            });
        }
    };
