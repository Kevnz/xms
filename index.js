'use strict';
var exposeData = function exposeXMSData (req, res, next) {
    next();
};
var cms = require('./lib/cms');
var loader = require('./lib/seed');

exports.handle = cms.handler;

exports.extend = function (app) {

    loader(function () {
        var pages = require('mongo-start')('pages');

        pages.find(function (err, docs) {
            for (var i = 0; i < docs.length; i++) {
                if(docs[i].publishOn !== null){
                    let po = new Date(docs[i].publishOn);
                    docs[i].publishOn = po;
                    let co = new Date(docs[i].createdOn);
                    docs[i].createdOn = co;
                    pages.save(docs[i]);
                } else {
                                        let co = new Date(docs[i].createdOn);
                    docs[i].createdOn = co;
                    pages.save(docs[i]);
                }
            };
        })
    });
    
    app.use(cms.handler);
    //get admin features and bolt them onto the app
    require('./lib/admin')(app);
};
