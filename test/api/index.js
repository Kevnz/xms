var request = require('supertest')
  , express = require('express');
 
var app = express();
var xms = require('../../index');
var assert = require('assert');
console.dir(xms);
xms.extend(app);

describe('The Admin HTTP API', function () {
	describe('getting pages', function () {
		describe('GET /pages/published', function () {
			it('should return a list of pages', function (done) {
				request(app)
					.get('/xms/api/pages/published')
					.expect('Content-Type', /json/)
					.expect('Content-Length', '20')
					.expect(200)
					.end(function(err, res){
						if (err) throw err;
						console.log(res);
						assert.ok(res.length > 0);
					});
			});
		});
	});
});