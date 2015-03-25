import React from 'react';
import Menu from './menu';
import ContentEditable from 'react-wysiwyg';

class Main extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state= {page:{title:props.title, content:props.content }, editing: props.editing};
        console.log(this.state);
        this.enableEditing = this.enableEditing.bind(this);        
        this.onChange = this.onChange.bind(this);
        this.renderControls = this.renderControls.bind(this);
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
    renderControls() {

        return (!this.state.editing) 
            ?   <div className="primary-button" onClick={this.enableEditing}>
                    Enable Editing
                </div>
            :
                <div className="actions">
                    <div className="primary-button" >
                        Save
                    </div>
                    <div className="primary-button" >
                        Publish
                    </div>
                    <div className="primary-button" >
                        Cancel
                    </div>
                    <div className="primary-button" >
                        Delete
                    </div>
                </div>;
 

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

                    <div className="page-content-body" >
                        <ContentEditable
                          tagName='div'
                          className='name-field'
                          onChange={this.onChange}
                          text={this.props.page.content}
                          placeholder='Your Content'
                          autofocus={true}
                          maxLength={1000}
                          editing={this.state.editing}
                        />

                        {this.renderControls()}
 

                    </div>
                </div>
            </div>
        );
    }
}

Main.defaultProps = { page: {title:'', content:''}, editing: false}
export default Main;