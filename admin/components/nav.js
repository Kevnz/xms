var React = require('react'); 
var Nav;
module.exports = Nav = React.createClass({
  render: function() {

    return (<div id="nav" className="pure-u">
        <a href="#" className="nav-menu-button">Menu</a>

        <div className="nav-inner">
            <button className="primary-button pure-button">Create Page</button>

            <div className="pure-menu pure-menu-open">
                <ul>
                    <li><a href="#">Published Pages <span className="email-count">(2)</span></a></li>
                    <li><a href="#">Unpublished Pages</a></li>
                    <li><a href="#">Drafts</a></li>
                    <li><a href="#">Trash</a></li>
                    <li className="pure-menu-heading">Labels</li>
                    <li><a href="#"><span className="email-label-personal"></span>Personal</a></li>
                    <li><a href="#"><span className="email-label-work"></span>Work</a></li>
                    <li><a href="#"><span className="email-label-travel"></span>Travel</a></li>
                </ul>
            </div>
        </div>
    </div>);
}
});