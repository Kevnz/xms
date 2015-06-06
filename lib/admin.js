'use strict';
module.exports = function (app) {



    var session = require('express-session');
    var mongojs = require('mongo-start').mongojs;
    var MongoSession = require('express-mongo-session');
    app.use(session({
        secret: 'xms is the name',
        resave: false,
        saveUninitialized: false,
        store: new MongoSession()
    }));

    var flash = require('connect-flash');
    app.use(flash());
    var path = require('path');
    var bodyParser = require('body-parser');
    var publishedPages = require('./middleware/publishedPages');
    var queuedPages = require('./middleware/queuedPages');
    var draftPages = require('./middleware/draftPages');
    var deletedPages = require('./middleware/deletedPages');
    var auth = require('./middleware/auth');
    var config = require('xtconf')();
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function(user, done) {
        console.log(user);
        console.log('serializeUser');
        done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
      done(null, {username:username, isAdmin:true});
    });

    passport.use(new LocalStrategy(
      function(username, password, done) {
          console.log('in the local strategy check function');
          console.log('username', username);
          console.log('password', password);

        if(config.get('admin-username') === username && config.get('admin-password') === password) {
          return done(null, {username:username, isAdmin :true });
        } else {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
      }
    ));


    var jsonParser = bodyParser.json();
    // parse application/x-www-form-urlencoded 
    app.use(bodyParser.urlencoded({ extended: false })); 
    app.use(bodyParser.json());
    //app.use(auth);
    app.get('/admin/', auth, function (req,res) {
        var message = { message: req.flash()};
        console.log('message', message);
        var file = path.normalize(path.join(__dirname, '../templates/index.ejs'));
        res.render(file, { message: message });
    });

    app.get('/admin/login', function (req, res) {
        console.log('login get');

        console.log('flash',message);

        var file = path.normalize(path.join(__dirname, '../templates/login.ejs'));
        //res.status(200).sendFile(file);
        res.render(file, { message: message });
    });

    app.post('/admin/login', jsonParser, passport.authenticate('local', { successRedirect: '/admin/',
        failureRedirect: '/admin/login',
        failureFlash: true }));

    app.get('/admin/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/admin/css/style.css', function (req, res) {
        var path = require('path');
        var file = path.normalize(path.join(__dirname, '../templates/css/style.css' ));
        res.status(200).sendFile(file);
    });
    app.get('/admin/fonts/:font', function (req, res) {
        var path = require('path');
        var file = path.normalize(path.join(__dirname, '../node_modules/font-awesome/fonts/', req.params.font ));
        res.status(200).sendFile(file);
    });
    app.get('/admin/js/:js', function (req, res) {
        var path = require('path');
        var file = path.normalize(path.join(__dirname, '../templates/js/', req.params.js ));
        res.status(200).sendFile(file);
    });



    app.get('/xms/api/pages/published', publishedPages, function (req, res) {
        res.send(req.xmsData.publishedPages);
    });
    app.get('/xms/api/pages/queued', queuedPages, function (req, res) {
        res.send(req.xmsData.queuedPages);
    });
    app.get('/xms/api/pages/draft', draftPages, function (req, res) {
        res.send(req.xmsData.draftPages);
    }); 
    app.get('/xms/api/pages/deleted', deletedPages, function (req, res) {
        res.send(req.xmsData.deletedPages);
    });

    app.get('/xms/api/settings', function (req, res) {
        var settings = require('mongo-start')('settings');

        settings.find(function (err, docs) {
            res.send(docs);
        })
    });

    app.post('/xms/api/pages', auth, jsonParser, function (req, res) {
        console.log('yup up:');
        console.log(req.body);
        var pages = require('mongo-start')('pages');
        var Joi = require('joi');

        var schema = Joi.object().keys({
            title: Joi.string().min(3).max(50).required(),
            subtitle: Joi.string().min(3).max(50),
            view: Joi.string().min(3).max(50).required(),
            route: Joi.string().min(1).max(50).required(),
            description: Joi.string().min(0).max(75),
            intro: Joi.string().min(0).max(155),
            content: Joi.string().min(5).max(5050).required(),
            createdBy: Joi.string().min(3).max(50).required(),
            createdOn: Joi.date()
        });

        var newpage = {
            title: req.body.title,
            view: req.body.view,
            description:req.body.description,
            content: req.body.content,
            route: req.body.route,
            createdBy: req.user.username,
            createdOn: Date.now()
        };
        Joi.validate(newpage, schema, function (err, value) { 
            console.log('validated');
            console.log(err);
            if(err) {
                res.json(err);//validation errors, handle that clientside
            }

            pages.save(newpage, function (err, docs) {
                console.log(err);
                res.sendStatus(200);
            });
        }); 

    });
    app.post('/xms/api/pages/:id', auth, function (req, res) {
        var pages = require('mongo-start')('pages');
        pages.findOne({
                _id:mongojs.ObjectId(req.params._id)
            },function (err, doc) {
            res.json(doc);
        });
    });
    app.get('/xms/api/pages/:id', function (req, res) {
        var pages = require('mongo-start')('pages');
        pages.findOne({
                _id:mongojs.ObjectId(req.params._id)
            },function (err, doc) {
            res.json(doc);
        })
    });

    app.get('/xms/api/users', function (req, res) {

    });

};