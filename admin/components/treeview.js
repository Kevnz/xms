/** @jsx React.DOM */

var React = require('react');
var TreeNode;
module.exports = TreeNode = React.createClass({
  getInitialState: function() {
    return {
      visible: true
    };
  },
  render: function() {
    console.log(arguments);
    console.log(this.props.node);
    var childNodes;
    var className = "";
    if (this.props.node.childNodes != null) {
      childNodes = this.props.node.childNodes.map(function(node, index) {
        return <li key={index}><TreeNode node={node} /></li>
      });

      className = "togglable";
      if (this.state.visible) {
        className += " togglable-down";
      } else {
        className += " togglable-up";
      }
    }

    var style = {};
    if (!this.state.visible) {
      style.display = "none";
    }

    return (
      <div>
        <h5 onClick={this.toggle} className={className}>
          {this.props.node.title}
        </h5>
        <ul style={style}>
          {childNodes}
        </ul>
      </div>
    );
  },
  toggle: function() {
    this.setState({visible: !this.state.visible});
  }
});