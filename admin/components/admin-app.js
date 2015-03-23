import React from 'react';
import Menu from './menu';
import List from './list';
import Main from './main';
import PageStore from '../stores/page-store';
import SettingsStore from '../stores/settings-store';
function _getStateFromStores () {
    console.log('_getStateFromStores');
    console.log(PageStore);
    var returnState = PageStore.getState();
    console.log(returnState);
    return returnState;
}


export default class AdminApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = _getStateFromStores();
    }
     
    componentDidMount () {
        PageStore.listen(this._onChange.bind(this));
    }
    componentWillUnmount () {
        PageStore.unlisten(this._onChange.bind(this));
    }
    render() {
        var selectedPage = this.state.selectedPage ? this.state.selectedPage._id : ''
        return (
            <div className="app">
                <Menu></Menu>
                <List pages={this.state.pages} selectedPage={selectedPage} ></List>
                <Main page={this.state.selectedPage} ></Main>
            </div>
        );
    }
    _onChange () {
        console.log('_onChange');
        this.setState(_getStateFromStores());
    }
}