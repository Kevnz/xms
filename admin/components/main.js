'use strict';
import React from 'react';
import Menu from './menu';
import ContentEditable from 'react-wysiwyg';
import daylight from 'daylight';

class Main extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state= { page:{title:props.title, content:props.content }, editing: props.editing};
        console.log(this.state);

        this.enableEditing = this.enableEditing.bind(this);
        this.disableEditing = this.disableEditing.bind(this);    
        this.onChange = this.onChange.bind(this);
        this._publishPage =this._publishPage.bind(this);
        this._savePage = this._savePage.bind(this);
        this._deletePage = this._deletePage.bind(this);

        this.renderControls = this.renderControls.bind(this);
    }
    _savePage() {
        var title = this.refs.title.getDOMNode().innerHTML;
        var content = this.refs.pageContent.getDOMNode().innerHTML;

        var page ={
            title,
            content
        };
        console.log(page);
    }
    _publishPage() {

    }
    _deletePage() {

    }
    onChange(text) {
    // in order to render the updated text,
    // you need to pass it as a prop to contentEditable.
    // This gives you increased flexibility.
        //this.setState({ 'page.content': text });
    }

    enableEditing() {
    // set your contenteditable field into editing mode.
        this.setState({ editing: true });
    }
    disableEditing() {
    // set your contenteditable field into editing mode.
        this.setState({ editing: false });
    }
    renderControls() {

        return (!this.state.editing) 
            ?   <div className="primary-button" onClick={this.enableEditing}>
                    Enable Editing
                </div>
            :
                <div className="actions">
                    <div className="warning-button" onClick={this.disableEditing}>
                        Cancel Edit
                    </div>
                </div>;
 

    }
    formatDate(){
        if (this.props.page.createdOn) {
            return (daylight('l, F jS Y h:i A',this.props.page.createdOn))
        } else { return "";}
    }
    render() {
        return (
            <div className="main">
                <div className="page-content">
                    <div className="page-content-header ">
                        <div className="page-content-header-wrapper">
                            <h1 className="page-content-title" contentEditable={this.state.editing} ref="title">{this.props.page.title}</h1>                            
                            <p className="page-content-subtitle">
                                From  <a href="">{this.props.page.createdBy}</a> at <span>{this.formatDate()} </span>
                            </p>
                        </div>

                        <div className="page-content-controls">
                            <button className="secondary-button" onClick={this._savePage}>Save</button>
                            <button className="secondary-button" onClick={this._publishPage}>Publish</button>
                            <button className="secondary-button" onClick={this._deletePage}>Delete</button>
                        </div>
                    </div>

                    <div className="page-content-body" >
                        <div contentEditable={this.state.editing} ref="pageContent">
                            {this.props.page.content}
                        </div>
                        {this.renderControls()}
 

                    </div>
                </div>
            </div>
        );
    }
}

Main.defaultProps = { page: {title:'', content:''}, editing: false}
export default Main;