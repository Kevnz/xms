var exposeData = function exposeXMSData (req, res, next) {
    next();
};
var cms = require('./lib/cms');
var loader = require('./lib/seed');
exports.handle = cms.handler;

exports.extend = function (app) {
    loader();   
    console.log(cms);
    //at this stage only one cms content route
    app.use(cms.handler);

    //get admin features and bolt them onto the app
    var admin = require('./lib/admin')(app);
 
};