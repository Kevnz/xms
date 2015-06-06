'use strict';
import React from 'react';
import Menu from './menu';
import ContentEditable from 'react-wysiwyg';
import daylight from 'daylight';
import ActionCreator from '../actions/action-creators';

class Main extends React.Component {
    constructor(props) {
        super(props);
        console.log('main props', props);

        this.state = { page: {title:props.title, content:props.content }, editing: props.editing};
        console.log('main state', this.state);

        this.enableEditing = this.enableEditing.bind(this);
        this.disableEditing = this.disableEditing.bind(this);    
        this.onChange = this.onChange.bind(this);
        this._publishPage =this._publishPage.bind(this);
        this._savePage = this._savePage.bind(this);
        this._deletePage = this._deletePage.bind(this);

        this.renderControls = this.renderControls.bind(this);

        console.log(props.page._id);
    }
    _savePage() {
        console.log('SAVEd');
        var title = this.refs.title.getDOMNode().innerHTML;
        var content = this.refs.pageContent.getDOMNode().innerHTML;
        let page = this.props.page;
        page.title = title;
        page.content = content;

        console.log(page);
        ActionCreator.savePage(page);
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
        console.log('renderControls ', this.props.page.edit || !this.state.editing);
        return (!this.isEdit()
            ?   <div className="primary-button" onClick={this.enableEditing}>
                    Enable Editing
                </div>
            :
                <div className="actions">
                    <div className="warning-button" onClick={this.disableEditing}>
                        Cancel Edit
                    </div>
                </div>);
 

    }
    isEdit(){
        if(this.props.page.edit) {
            return this.props.page.edit;
        }
        return this.state.editing;

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
                            <h1 className="page-content-title" contentEditable={this.isEdit()} ref="title">{this.props.page.title}</h1>
                            <h3 className="page-content-subtitle" contentEditable={this.isEdit()} ref="title">{this.props.page.subtitle}</h3>
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

                        <h4>Intro</h4>
                        <div contentEditable={this.isEdit()} ref="pageIntro" className="page-content-body-inner">
                            {this.props.page.intro}
                        </div>
                        <hr />
                        <h4>Description</h4>
                        <div contentEditable={this.isEdit()} ref="pageDescription" className="page-content-body-inner">
                            {this.props.page.description}
                        </div>
                        <hr />
                        <h4>Main Content</h4>
                        <div contentEditable={this.isEdit()} ref="pageContent" className="page-content-body-inner-main">
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