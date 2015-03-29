import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin'
import mixin from 'react-mixin';
import SettingsStore from '../stores/settings-store';
import MenuItem from './menu-item';

function getStateFromStores() {
    return {settings: SettingsStore.getState()};
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {settings: props.settings};
        console.log('menu state', this.state);       
        //this.onChange = this.onChange.bind(this);
    }
    componentDidMount () { 
        this.listenTo(SettingsStore, this._onChange.bind(this));
    } 
    _onChange () {

        this.setState(getStateFromStores().settings);
    }
    onSelect () {
        
    }
    onMenuClick (e) {

    }
    render() {
        console.log('menu state',this.state.settings);
        let self = this;
        let settingNodes = this.state.settings.map((setting) => {
            return (<MenuItem setting={setting}></MenuItem>)
        })
        return (
            <div className="menu">
                <a href="#" className="menu-button">Menu</a>

                <div className="nav-inner">
                    <button className="compose-button">Compose</button>

                    <div className="inner-menu">
                        <ul className="menu-list">
                            {settingNodes}
                            <li className="menu-heading">Labels</li>
                            <li className="menu-item"><a href="#" className="menu-link"><span className="page-label-personal"></span>Personal</a></li>
                            <li className="menu-item"><a href="#" className="menu-link"><span className="page-label-work"></span>Work</a></li>
                            <li className="menu-item"><a href="#" className="menu-link"><span className="page-label-travel"></span>Travel</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Menu.defaultProps = { settings: [{name:''}]}


mixin(Menu.prototype, ListenerMixin);


export default Menu;