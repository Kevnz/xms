var React = require('react'); 
var format = require("string-template")

var PageList = require('../admin/components/pagelist');
var el = document.getElementById('container');
var defPages = [{ title: 'First',
              view: 'index',
              description:'the description',
        content:'here',
        route:'/'}]

React.render(
  <PageList data={defPages} />,el
);



