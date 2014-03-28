var express = require('express'),
    exphbs  = require('express3-handlebars'),
    http = require('http'),
    path = require('path'),
    app = express(),
    expstate = require('express-state');

console.log(__dirname);
expstate.extend(app);

app.configure(function(){
    app.set('port', process.env.PORT || 3125);
    app.set('views', __dirname + '/views'); 
    app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir:__dirname + '/views/layouts'}));
    app.set('view engine', 'handlebars');

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
    app.locals.pretty = true;
});
 

var xms = require('../../index');

console.dir(xms);
xms.extend(app);


app.get('/render', xms.handle, function(req, res, next){
    console.dir(app);
  res.render('index', { title: 'test' });
  next();
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + " in " + app.get('env') +" mode");
});
