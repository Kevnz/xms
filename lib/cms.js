module.exports = { 
        handler: function (req, res, next) {
            console.log('in xms handler');
            var pages = require('mongo-start')('pages');
            pages.findOne({route:req.path}, function (err, data) {
                if (data) {
                    console.log('data does it.');
                    var xmsmock = {
                        view: 'index',
                        content: 'test content'
                    };
                    res.locals.xms = data; 

                    res.render(xmsmock.view);
                } else {
                    console.log('xms');
                    console.log(req.path)
                    res.locals.xms = {
                        content: "No content was found",
                        title: "Not found"
                    }
                    next();
                }
                if(err) {}

                
            });
        }
    };
