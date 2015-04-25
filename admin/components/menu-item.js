import React from 'react';
import ActionCreators from '../actions/action-creators';
import ListenerMixin from 'alt/mixins/ListenerMixin'
import mixin from 'react-mixin';
import SettingsStore from '../stores/settings-store';

function getStateFromStores(key) {
    return {isSelected: SettingsStore.getState().selectedSetting === key};
}

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isSelected: props.isSelected};
        this.selectItem = this.selectItem.bind(this);
    }
    selectItem(e) {
        console.log('select ' +this.props.page);
        this.setState({isSelected: true});
        ActionCreators.settingSelected(this.props.setting);
    }
    componentDidMount () { 
        this.listenTo(SettingsStore, this._onChange.bind(this));
    } 
    _onChange () {

        this.setState(getStateFromStores(this.props.setting._id));
    }
    render() {
        let selected = this.props.isSelected ;
        if (this.state && this.state.isSelected) {
            selected = true;
        }
        
        let menuItem = selected ? 'menu-item menu-item-selected' : 'menu-item'
        let iconClass = 'pages-'+ this.props.setting.name.toLowerCase();
        return (
        <li className={menuItem}>
            <a href="#" onClick={this.selectItem} className="menu-link">
                <span className={iconClass} >   </span>
                {this.props.setting.name}
            </a>
        </li>
        );
    }
}
MenuItem.defaultProps = { isSelected: false}


mixin(MenuItem.prototype, ListenerMixin);
//<img className="editor-avatar" alt="editor avatar" height="64" width="64" src="" />