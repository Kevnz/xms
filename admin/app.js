var React = require('react'); 
var format = require("string-template")

var AdminApp = require('../admin/components/admin-app');
var el = document.getElementById('container');



var api = require('./utils/api');

api.getAllPages();
api.getAllSettings();
React.render(
  <AdminApp />, el
);



