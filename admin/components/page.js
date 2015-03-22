import React from 'react';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let unknown = 'Unknown';
        let nodesc ='No Description was give, not cool';
        return (
        <div className="page-item page-item-unread">
            <div className="pure-u">
                <span className="avatar-unknown"></span>
                
            </div>

            <div className="page-item-details">
                <h5 className="page-editor-name">Editor {this.props.page.createdBy || unknown}</h5>
                <h4 className="page-title">{this.props.page.title}</h4>
                <p className="page-desc">
                    {this.props.page.description || nodesc }
                </p>
            </div>
        </div>
        );
    }
}

//<img className="editor-avatar" alt="editor avatar" height="64" width="64" src="" />