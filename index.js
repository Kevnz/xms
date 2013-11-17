var exposeData = function exposeXMSData (req, res, next) {
    next();
};

exports.extend = function (app) {
    app.use(exposeData);
	console.log(app);
    console.log('!!!');
    console.log(app.routes.get);
    console.log(app.routes.post);
};