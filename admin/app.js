var React = require('react'); 
var format = require("string-template")

var AdminApp = require('../admin/components/admin-app');
var el = document.getElementById('container');

var nr = require('naive-request');
var defPages = nr.get('/xms/api/pages');
React.render(
  <AdminApp data={defPages} />, el
);



