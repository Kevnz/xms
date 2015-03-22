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
      <div className="menu">
      <ul className="page-list">
        {pageNodes}
      </ul>
      </div>
    );
  }
});