/** @jsx React.DOM */

var React = require('react');
var TreeView = require('../admin/components/treeview');
var format = require("string-template")

var agent = require('superagent');
var PAGES_URI = '/xms/api/pages';
var PAGE_URI = '/xms/api/pages/{id}';
var defPages = [{"_id":"549394dd0e22880de0000001","view":"index","content":"This is a test","title":"Test Title","createdOn":1418956973794,"createdBy":"kev_nz"},{"_id":"549395360e22880de0000002","view":"index","content":"Another Test","title":"Another Test Title","createdOn":1418958114420,"createdBy":"kev_nz"},{"_id":"54939de1972a76e2e8000001","view":"index","content":"A third","title":"Third Test Title","createdOn":1418960039157,"createdBy":"kev_nz"}];

    agent
        .get(PAGES_URI)
        .end(function(error, res){
            console.log(error);
            console.log(res);
        });
/*
<TreeView
              key={i}
              nodeLabel={label}
              collapsed={collapsedBookkeeping[i]}
              onClick={this.handleClick.bind(null, i)}>
                {node.map(function(entry) {
                  return <div className="info" key={entry}>{entry}</div>;
                })}
            </TreeView>
*/
var treeData = {
  title: "howdy",
  childNodes: [
    {title: "bobby"},
    {title: "suzie", childNodes: [
      {title: "puppy", childNodes: [
        {title: "dog house"}
      ]},
      {title: "cherry tree"}
    ]}
  ]
};
/*
var tree = component(function (props) {
  return TreeView({node:treeData});
}); 
*/



var PageList = require('../admin/components/pagelist');
var el = document.getElementById('container');


React.render(
  <PageList data={defPages} />,el
);



