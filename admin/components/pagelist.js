/** @jsx React.DOM */

var React = require('react');
var PageItem = require('./pageitem');
var PageList;
module.exports = PageList = React.createClass({
  render: function() {
    var pageNodes = this.props.data.map(function (page) {
      return (
        <PageItem page={page}>
        </PageItem>
      );
    });
    return (
      <div className="pure-menu pure-menu-open">
      <ul className="commentList">
        {pageNodes}
      </ul>
      </div>
    );
  }
});