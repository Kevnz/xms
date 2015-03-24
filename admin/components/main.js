import React from 'react';
import Menu from './menu';
import ContentEditable from 'react-wysiwyg';
import { If, Then, Else } from 'react-if'
export default class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange(text) {
    // in order to render the updated text,
    // you need to pass it as a prop to contentEditable.
    // This gives you increased flexibility.
        this.setState({ text: text });
    }

    enableEditing() {
    // set your contenteditable field into editing mode.
        this.setState({ editing: true });
    }
    render() {
         var editMode = this.props.editing ;
        if (this.state && this.state.editing) {
            editMode = true;
        }
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

                    <div className="page-content-body" >
                        <ContentEditable
                          tagName='div'
                          className='name-field'
                          onChange={this.onChange.bind(this)}
                          text={this.props.page.content}
                          placeholder='Your Content'
                          autofocus={true}
                          maxLength={1000}
                          editing={editMode}
                        />
                        <If condition={editMode} >
                            <Then>
                                <button className="primary-button" >
                                    Save
                                </button>
                                <button className="primary-button" >
                                    Publish
                                </button>
                                <button className="primary-button" >
                                    Cancel
                                </button>
                                <button className="primary-button" >
                                    Delete
                                </button>   
                            </Then>
                            <Else>
                                <button className="primary-button" onClick={this.enableEditing.bind(this)}>
                                Enable Editing
                                </button>
                            </Else>
                        </If>


                    </div>
                </div>
            </div>
        );
    }
}

Page.defaultProps = { page: {title:'', content:'', editing: false}}