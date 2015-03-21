var Model = require('bamboo/model');
var ajax = require('bamboo-sync-ajax');
 
var Page = Model({
    title: String,
    view: String,
    route:String,
    description: String,
    content: String,
}, { sync: ajax, url_root: '/xms/api/pages' });

module.exports = Page;