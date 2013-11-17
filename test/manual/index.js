var express = require('express'),
 
    http = require('http'),
    path = require('path'),
    app = express();


 

app.configure(function(){
    app.set('port', process.env.PORT || 3311);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});
app.get('/testroute',function (req, res) {
    res.send('test');
});
var xms = require('../../index');

xms.extend(app);
 



http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + " in " + app.get('env') +" mode");
});
