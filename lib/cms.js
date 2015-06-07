'use strict';
module.exports = { 
        handler: function (req, res, next) {
            console.log('in xms handler');
            var pages = require('mongo-start')('pages');
            console.log(req.path);
            pages.findOne({route:req.path}, function (err, data) {
                console.log('pages find');
                console.log(data);
                console.log(err);
                if (data) {
                    var xmsmock = {
                        view: 'index',
                        content: 'test content'
                    };
                    res.locals.xms = data; 
                    console.log(data);
                    res.render(xmsmock.view, {xms:data});

                } else {
                    res.locals.xms = {
                        content: "No content was found",
                        title: "Not found"
                    };
                    next();
                }
                if (err) {
                    console.error(err);
                }
                //next();
                
            });
        }
    };
