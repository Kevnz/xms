'use strict';
import React from 'react';
import mixin from 'react-mixin';
function getStateFromStores(key) {
    return {isSelected: PageStore.getState().selectedPage === key};
}

export default class Input extends React.Component {
    constructor(props) {
        super(props);
    }
    getInitialState () {
        return { value: '' };
    }
    componentDidMount () {
    } 
    handleChange (event) {
        this.setState({value: event.target.value});
    }
    render() {
        var value = this.state.value;
        return (<input type="text" value={value} onChange={this.handleChange} />);
    }
}
Page.defaultProps = { isSelected: false}


mixin(Page.prototype, ListenerMixin);
//<img className="editor-avatar" alt="editor avatar" height="64" width="64" src="" />