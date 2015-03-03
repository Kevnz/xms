var agent = require('superagent');
var PAGES_URI = '/xms/api/pages';
var PAGE_URI = '/xms/api/pages/{id}';
var format = require("string-template")

var defPages = [{"_id":"549394dd0e22880de0000001","view":"index","content":"This is a test","title":"Test Title","createdOn":1418956973794,"createdBy":"kev_nz"},{"_id":"549395360e22880de0000002","view":"index","content":"Another Test","title":"Another Test Title","createdOn":1418958114420,"createdBy":"kev_nz"},{"_id":"54939de1972a76e2e8000001","view":"index","content":"A third","title":"Third Test Title","createdOn":1418960039157,"createdBy":"kev_nz"}];

var PagesClient = {
    
    getPages: function (callback) {
        agent
            .get(PAGES_URI)
            .end(callback);
    },
    addPage: function (page, callback) {
        agent
            .post(PAGES_URI)
            .send(page)
            .set('Accept', 'application/json')
            .end(callback);
    },
    editPage: function (page, callback) {
        agent
            .post(format(PAGE_URI, {id: page._id})
            .send(page)
            .set('Accept', 'application/json')
            .end(callback);
    }
};

module.exports = PagesClient;