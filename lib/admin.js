module.exports = function (app) {
	var path = require('path');

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
	})

};