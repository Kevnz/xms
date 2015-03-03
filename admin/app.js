/** @jsx React.DOM */

var React = require('react');
var TreeView = require('../admin/components/treeview');
var format = require("string-template")

 
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



