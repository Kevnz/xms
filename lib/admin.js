module.exports = function (app) {
	var path = require('path');
 

var bodyParser = require('body-parser')
var publishedPages = require('./middleware/publishedPages');
var queuedPages = require('./middleware/queuedPages');
var draftPages = require('./middleware/draftPages');
var deletedPages = require('./middleware/deletedPages');


var jsonParser = bodyParser.json()

	app.get('/admin/', function (req,res) {
		
		var file = path.normalize(path.join(__dirname, '../templates/index.html'));
		res.status(200).sendFile(file);
	});

	app.get('/admin/login', function (req, res) {

	});
	app.post('/admin/login', function (req, res) {

	});

	app.get('/admin/logout', function (req, res) {

	});

	app.get('/admin/css/style.css', function (req, res) {
		var path = require('path');
		var file = path.normalize(path.join(__dirname, '../templates/css/style.css' ));
		res.status(200).sendFile(file);
	});
	app.get('/admin/fonts/fontawesome-webfont.woff2', function (req, res) {
		var path = require('path');
		var file = path.normalize(path.join(__dirname, '../node_modules/font-awesome/fonts/fontawesome-webfont.woff2' ));
		res.status(200).sendFile(file);
	});
	app.get('/admin/fonts/fontawesome-webfont.woff', function (req, res) {
		var path = require('path');
		var file = path.normalize(path.join(__dirname,'../node_modules/font-awesome/fonts/fontawesome-webfont.woff' ));
		res.status(200).sendFile(file);
	});
		app.get('/admin/fonts/fontawesome-webfont.ttf', function (req, res) {
		var path = require('path');
		var file = path.normalize(path.join(__dirname, '../node_modules/font-awesome/fonts/fontawesome-webfont.ttf' ));
		res.status(200).sendFile(file);
	});
	app.get('/admin/js/app.js', function (req, res) {
		var path = require('path');
		var file = path.normalize(path.join(__dirname, '../templates/js/app.js' ));
		res.status(200).sendFile(file);
	});
	app.get('/admin/js/react.js', function (req, res) {
		var path = require('path');
		var file = path.normalize(path.join(__dirname, '../templates/js/app.js' ));
		res.status(200).sendFile(file);
	});
	app.get('/admin/js/app.js.map', function (req, res) {
		var path = require('path');
		var file = path.normalize(path.join(__dirname, '../templates/js/app.js.map' ));
		res.status(200).sendFile(file);
	});


	app.get('/xms/api/pages/published', publishedPages, function (req, res) {
		var pages = require('mongo-start')('pages');

		res.send(req.xmsData.publishedPages);
	});
	app.get('/xms/api/pages/queued', queuedPages, function (req, res) {
		var pages = require('mongo-start')('pages');

		res.send(req.xmsData.queuedPages);
	});
	app.get('/xms/api/pages/draft', draftPages, function (req, res) {
		var pages = require('mongo-start')('pages');

		res.send(req.xmsData.draftPages);
	});	
		app.get('/xms/api/pages/deleted', deletedPages, function (req, res) {
		var pages = require('mongo-start')('pages');

		res.send(req.xmsData.deletedPages);
	});	
	app.get('/xms/api/settings', function (req, res) {
		var settings = require('mongo-start')('settings');

		settings.find(function (err, docs) {
			res.send(docs);
		})
	});
	app.post('/xms/api/pages',jsonParser, function (req, res) {
		console.log('yup up:')
		var pages = require('mongo-start')('pages');
		var Joi = require('joi');

		var schema = Joi.object().keys({
		    title: Joi.string().min(3).max(50).required(),
		    view: Joi.string().min(3).max(50).required(),
		    route: Joi.string().min(1).max(50).required(),
		    description: Joi.string().min(0).max(75),
		    content: Joi.string().min(5).max(5050).required(),
		    createdBy: Joi.string().min(3).max(50).required(),
		    createdOn: Joi.date(),
		});
		var cheerio = require('cheerio');
		var $c = cheerio.load(req.body.content);

		var content = $c.removeAttr('data-reactid').html();

		var newpage = {
			title: req.body.title,
			view: req.body.view,
			description:req.body.description,
			content: content,
			route: req.body.route,
			createdBy: 'some user',
			createdOn: Date.now()
		};
		console.log(newpage);
		Joi.validate(newpage, schema, function (err, value) { 
			console.log('validated');
			console.log(err);
			if(err) {
				res.json(err);//validation errors, handle that clientside
			}
			console.log(pages);

			pages.save(newpage, function (err, docs) {
				console.log(err);
				res.sendStatus(200);
			});
		}); 

	});
	app.get('/xms/api/pages/:id', function (req, res) {
		pages.findOne({
			    _id:mongojs.ObjectId(req.params.id)
			},function (err, doc) {
			res.json(doc);
		})
	});

};