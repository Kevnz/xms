import React from 'react';
import Menu from './menu';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
 
        return (
            <div className="main">
                <div className="page-content">
                    <div className="page-content-header ">
                        <div className="page-content-header-wrapper">
                            <h1 className="page-content-title"> {this.props.page.title}</h1>                            <p className="page-content-subtitle">
                                From  Someone at <span>SomeTime</span>
                            </p>
                        </div>

                        <div className="page-content-controls">
                            <button className="secondary-button">Save</button>
                            <button className="secondary-button">Publish</button>
                            <button className="secondary-button">Delete</button>
                        </div>
                    </div>

                    <div className="page-content-body" dangerouslySetInnerHTML={{__html: this.props.page.content}}>

                    </div>
                </div>
            </div>
        );
    }
}

Page.defaultProps = { page: {title:'', content:''}}