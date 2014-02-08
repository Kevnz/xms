module.exports = function (app) {
	var path = require('path');

	app.get('/admin/', function (req,res) {
		
		var file = path.normalize(path.join(__dirname, '../templates/index.html'));
		res.status(200).sendfile(file);
	});

	app.get('/admin/login', function (req, res) {

	});
	app.post('/admin/login', function (req, res) {

	});

	app.get('/admin/logout', function (req, res) {

	});

	app.get('/admin/css/:file', function (req, res) {
		var path = require('path');
		var file = path.normalize(path.join(__dirname, '../templates/css/', req.params.file));
		res.status(200).sendfile(file);
	})



};