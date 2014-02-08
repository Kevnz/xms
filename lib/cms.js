module.exports = {
		route: '/page/:slug',
		handler: function (req, res) {

			console.log(req.params.slug);
			res.render('index', { title: 'XMS', content: '' });
		}
	};
