var exposeData = function exposeXMSData (req, res, next) {
    next();
};


exports.extend = function (app) {
    app.use(exposeData);
    var cms = require('./lib/cms');
    console.log(cms);
    //at this stage only one cms content route
    app.get(cms.route, cms.handler);

    //get admin features and bolt them onto the app
    var admin = require('./lib/admin')(app);
    console.log('!!!');
    console.log(app.routes.get);
    console.log(app.routes.post);
};