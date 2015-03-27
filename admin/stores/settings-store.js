import alt from '../alt';
import ActionCreators from '../actions/action-creators';

class SettingsStore {
    constructor() {
        this.bindActions(ActionCreators);
        this.settings = []; 
    }
    onReceiveSettings (settings) {
        console.log(settings);
        this.settings = settings;
    }
}

module.exports = alt.createStore(SettingsStore);