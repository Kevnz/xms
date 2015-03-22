import React from 'react';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu">
                <a href="#" className="menu-button">Menu</a>

                <div className="nav-inner">
                    <button className="compose-button">Compose</button>

                    <div className="inner-menu">
                        <ul className="menu-list">
                            <li className="menu-item"><a href="#" className="menu-link">Inbox <span className="email-count">(2)</span></a></li>
                            <li className="menu-item"><a href="#" className="menu-link">Important</a></li>
                            <li className="menu-item"><a href="#" className="menu-link">Sent</a></li>
                            <li className="menu-item"><a href="#" className="menu-link">Drafts</a></li>
                            <li className="menu-item"><a href="#" className="menu-link">Trash</a></li>
                            <li className="menu-heading">Labels</li>
                            <li className="menu-item"><a href="#" className="menu-link"><span className="email-label-personal"></span>Personal</a></li>
                            <li className="menu-item"><a href="#" className="menu-link"><span className="email-label-work"></span>Work</a></li>
                            <li className="menu-item"><a href="#" className="menu-link"><span className="email-label-travel"></span>Travel</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}