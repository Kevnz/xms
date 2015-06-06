import React from 'react/addons';
import Menu from './menu';
import List from './list';
import Main from './main';
import PageStore from '../stores/page-store';
import SettingsStore from '../stores/settings-store';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function _getStateFromStores () {
    console.log('_getStateFromStores');
    var returnState = {
        pages: PageStore.getState(),
        settings:SettingsStore.getState()
    };
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
        var selectedPage = this.state.pages.selectedPage ? this.state.pages.selectedPage._id : {};
        console.log('render the selected page from the main app', this.state.pages.selectedPage);
        return (
            <div className="app">
                <Menu></Menu>
                <List pages={this.state.pages.pages} selectedPage={this.state.pages.selectedPage} ></List>
                <ReactCSSTransitionGroup transitionName="example">
                    <Main page={this.state.pages.selectedPage} key={this.state.pages.selectedPage._id}></Main>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
    _onChange () {
        console.log('_onChange');
        this.setState(_getStateFromStores());
    }
}