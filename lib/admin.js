module.exports = function (app) {
	var path = require('path');
var bodyParser = require('body-parser')

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
		app.get('/admin/css/react-treeview.css', function (req, res) {
		var path = require('path');
		var file = path.normalize(path.join(__dirname, '../node_modules/react-treeview/react-treeview.css' ));
		res.status(200).sendFile(file);
	})

	app.get('/admin/css/styles.css', function (req, res) {
		var path = require('path');
		var file = path.normalize(path.join(__dirname, '../templates/css/styles.css' ));
		res.status(200).sendFile(file);
	})

	app.get('/admin/js/app.js', function (req, res) {
		var path = require('path');
		var file = path.normalize(path.join(__dirname, '../templates/js/app.js' ));
		res.status(200).sendFile(file);
	});


	app.get('/xms/api/pages', function (req, res) {
		var pages = require('mongo-start')('pages');

		pages.find(function (err, docs) {
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
		    description: Joi.string().min(0).max(75),
		    content: Joi.string().min(5).max(5050).required(),
		    createdBy: Joi.string().min(3).max(50).required(),
		    createdOn: Joi.date(),
		});
		var newpage = req.body.page;
		console.log(req.body);
		Joi.validate(newpage, schema, function (err, value) { 
			if(err) {
				res.json(err);//validation errors, handle that clientside
			}
			pages.save(newpage, function (err, docs) {
				console.log(err);
				res.json(docs);
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